# Z-lib Booklist Enhancer v3 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将现有 v2 Userscript 升级为六站全站路由、多语言界面、改进的书卡显示与统计卡，以及两项由用户主动触发的自动化功能。

**Architecture:** 保持 `booklist-enhancer.user.js` 为无需构建的单文件脚本，现有格式/年份/下载筛选和 `zble-settings-v2` 原样迁移。脚本内部以纯函数处理语言、站点偏好、路由、批次判断和开页目标，以顶层启动控制器负责提示窗或书单面板的互斥生命周期；临时自动化观察器不得改变原有筛选器的一轮刷新。新增 Node 测试夹具模拟浏览器事件，真实浏览器验收单独记录。

**Tech Stack:** JavaScript Userscript、Tampermonkey、Node.js 内建 `node:test`、现有本地 HTML/DOM 夹具；无构建步骤、运行时依赖或外部网络资源。

**Spec:** `docs/superpowers/specs/2026-10-04-booklist-enhancer-v3-design.md`；既有行为还须满足 `docs/superpowers/specs/2026-10-03-booklist-enhancer-v2-design.md`。

## Global Constraints

- `@name` 和浮窗标题固定为 `Z-lib Booklist Enhancer`；`@match` 恰为 `https://z-lib.sk/*`、`https://z-library.sk/*`、`https://1lib.sk/*`、`https://libb.la/*`、`https://z-library.im/*`、`https://z-lib.fm/*`，不加入 `.biz`、HTTP 或全网通配；加 `@noframes` 与顶层窗口兜底。
- 首轮目标为桌面当前稳定 Chrome、Firefox、Edge 搭配 Tampermonkey；各自独立验收，未测不得声称兼容。
- 界面语言包括 `en`、`zh-CN`、`zh-TW`、`fr`、`de`、`ru`、`ja`、`ko`、`es`、`pt-BR`；默认跟随 `navigator.languages`，不匹配回退英语。工具生成的可见/无障碍/动态文案全部翻译，原站文案不改。
- 保留 `zble-settings-v2` 的所有现有字段和值；格式首次仍不预选，下载状态未知仍等待或超时，绝不当作未下载。语言为全局偏好；提示关闭与批量开页授权按主机分开保存。
- 提示窗仅在六个内置主机的非书单页出现，每标签页/每域名会话至多一次，十秒后关闭；用户添加的镜像非书单页静默。存储不可用和复制标签页按规格降级。
- `连点 5 次 Show more` 以每轮新增 20 张真实书卡并短暂稳定为继续条件；书单总数不作严格目标，末轮不足 20、按钮消失、20 秒超时均保守停止。不自动执行按钮以外的站点私有加载接口。
- 批量开页默认按域名禁用；只处理确认时当前加载且本工具和站点均可见的同源 `/book/` 链接，两次确认后经 `GM_openInTab` 后台提交；无硬上限、无持久书籍历史、无 `window.open` 兜底、无自动重试。
- 批量收藏本版仅禁用的「开发中」入口，不触发收藏请求。除用户点击自动化外，不自动点原站按钮、不打开书页、不修改账号数据。
- 不持久化书名、书页 URL、下载映射、令牌或阅读进度；测试夹具和日志也不得包含这些私人数据。只在用户此前指定的当前目录开发，不创建 worktree。

## Review Focus

下列五种高风险输入须有对应任务的失败测试，而不能仅靠视觉检查：

1. 晚注入时 `marksLoaded` 已过且下载标记为空：下载筛选继续等待/超时，不误判全未下载（Task 2）。
2. `pagehide` 清理后从 BFCache 恢复，或同文档 URL 切换：恰好一套正确路由的监听器/界面，不让旧书单面板操作新书单（Task 2）。
3. `sessionStorage` 被拒绝或复制标签页带来已显示标记：提示退化为当前文档去重，不重试写入造成异常；复制标记允许抑制新标签提示（Task 3）。
4. Show more 本批先追加 1–19 本、末轮不足 20、总数中途变化：不能提前进入下一轮或无限等待（Task 5）。
5. 两次批量开页确认之间列表、筛选或域名授权变化：首个开页请求前复核失败即零操作（Task 6）。

## File map

- `booklist-enhancer.user.js`：唯一可安装产物；按内部纯逻辑、页面生命周期、提示窗/面板、自动化顺序组织，不引入模块加载器。
- `tests/booklist-enhancer.test.cjs`：保留 v2 的 33 项回归，增补纯逻辑、元数据和书卡 DOM 测试。
- `tests/runtime-fixture.cjs`（新）：最小事件目标、时钟、会话存储及 `GM_openInTab` 模拟，供路由/提示/自动化测试复用；不模拟真实登录请求。
- `tests/v3-runtime.test.cjs`（新）：启动生命周期、提示、Show more 五连与批量开页的可控运行时测试。
- `tests/dom-fixture.cjs`、`tests/fixture.html`：补充作者、长译文、提示窗和统计卡的本地布局夹具。
- `README.md`：安装匹配、镜像 User matches、语言/域名偏好及自动化风险说明。
- `docs/superpowers/specs/2026-10-04-booklist-enhancer-v3-test-record.md`（新）：记录自动化测试与 Chrome/Firefox/Edge 的实际验收结果，未测标为「未验证」。

---

### Task 1: 设置迁移与国际化基础

**Files:** Modify `booklist-enhancer.user.js`, `tests/booklist-enhancer.test.cjs`.

**Interfaces:** Extend `sanitizeSettings(saved) -> Settings` with `showFullAuthor=false` and `uiLanguage='auto'`; add `resolveLocale(preference, languages) -> Locale`, `translate(locale, key, params={}) -> string`, `sanitizeSitePrefs(saved) -> Record<hostname,{welcomeEnabled:boolean,bulkOpenEnabled:boolean}>`. Define `TRANSLATION_KEYS` as the canonical key set for all UI copy; later tasks may add keys only together with all ten translations. Use existing `zble-settings-v2` for global settings and new `zble-site-prefs-v3` for per-host settings. Expose pure helpers via the existing Node-only export.

- [ ] **Step 1: Write failing tests.** Assert old settings and default empty format survive, malformed `uiLanguage`/site-pref records fall back, and only hostnames without path/protocol are accepted. Include `assert.equal(resolveLocale('auto',['zh-HK']), 'zh-TW')`, corresponding `fr-CA`→`fr` and unsupported→`en`, and `assert.deepEqual(sanitizeSettings({formats:[]}).formats, [])`. Assert every `TRANSLATION_KEYS` entry exists in all ten packs, and later-used `data-i18n`/`translate` keys belong to that set. Test named `X` substitution and HTML-like data staying plain text.
- [ ] **Step 2: Run** `node --test tests/booklist-enhancer.test.cjs`; expected RED on absent v3 fields/helpers.
- [ ] **Step 3: Implement** the two new setting fields, host-pref sanitization, ten complete dictionaries, locale selection and `translate`; keep translation strings as data and never interpolate them through `innerHTML` with user-controlled parameters.
- [ ] **Step 4: Run** `node --test tests/booklist-enhancer.test.cjs` and `node --check booklist-enhancer.user.js`; expected PASS and exit 0.
- [ ] **Step 5: Commit** the scoped files with `git -c safe.directory=D:/WorkingCloud/zlibrary-booklist-enhancer commit -m "feat: add v3 locale and site preferences"` after staging them explicitly.

### Task 2: 全站匹配、路由和页面生命周期

**Files:** Modify `booklist-enhancer.user.js`, `tests/booklist-enhancer.test.cjs`; create `tests/runtime-fixture.cjs`, `tests/v3-runtime.test.cjs`.

**Interfaces:** Add `classifyPage(hostname, pathname, fingerprint) -> 'booklist'|'notice'|'pending'|'silent'`; runtime `startRoute()`/`stopRoute()` own exactly one active route and release listeners/observers. Booklist activation consumes existing `hasBooklistFingerprint()` and `activate()`; notice route is a placeholder until Task 3. Host set is the six metadata hosts.

- [ ] **Step 1: Write failing tests.** Assert six `https://host/*` matches, `@noframes`, no `.biz`; include `assert.equal(classifyPage('1lib.sk','/',false), 'notice')` and `assert.equal(classifyPage('mirror.example','/booklist/1',false), 'pending')` (pending is silent until fingerprint succeeds). Check `/booklists`→notice and mirror non-booklist→silent. In a VM runtime fixture, assert top-frame guard, late `DOMContentLoaded`, empty late download map remaining waiting, `pagehide`→`pageshow({persisted:true})` reattaching exactly once, and URL/DOM change disabling stale booklist controls.
- [ ] **Step 2: Run** `node --test`; expected RED on v3 metadata/classifier/lifecycle assertions.
- [ ] **Step 3: Implement** metadata (`@grant GM_openInTab`, supported `urlchange` hook), idempotent router, 30-second fingerprint wait, `pageshow` restore and event-driven same-document route checks. At each panel action also validate current URL/container; do not monkeypatch site `history`.
- [ ] **Step 4: Run** `node --test` and `node --check booklist-enhancer.user.js`; expected PASS. Confirm no duplicate DOM host/observer after repeated `pageshow` in the fixture.
- [ ] **Step 5: Commit** the scoped files with message `feat: route v3 userscript across known sites`.

### Task 3: 非书单提示窗与逐域名关闭

**Files:** Modify `booklist-enhancer.user.js`, `tests/v3-runtime.test.cjs`, `tests/runtime-fixture.cjs`, `tests/fixture.html`.

**Interfaces:** `createNotice({locale,host,now,sessionStore,sitePrefs,onDisable}) -> {refreshLocale,dispose}`; only Task 2's `notice` route calls it. Persist `zble-intro-seen-v3:<hostname>` in `sessionStorage` when available; host preference `welcomeEnabled=false` suppresses it independently of other hosts. Ten-second absolute deadline, not ten timer callbacks.

- [ ] **Step 1: Write failing tests.** Assert first non-booklist view shows notice, same-tab return does not, another host is independent, `/booklists` omits self-link, close button counts down `10…0` without negatives, manual close clears timers, opt-out persists only current host and reset allows a later session to show it. Include `assert.equal(sessionStore.getItem('zble-intro-seen-v3:1lib.sk'), '1')` after first mount. Simulate storage `SecurityError`, copied seen marker, background timer delay followed by `visibilitychange`, reduced motion and dark mode CSS.
- [ ] **Step 2: Run** `node --test tests/v3-runtime.test.cjs`; expected RED on missing notice.
- [ ] **Step 3: Implement** isolated fixed notice UI with translated text/ARIA, two blue border flashes, dark/high-contrast and reduced-motion rules; use deadline checks on timer, `visibilitychange` and `pageshow`. Add the booklist setting that reverses this host's opt-out without showing the notice immediately.
- [ ] **Step 4: Run** `node --test` and syntax check; expected PASS. Inspect fixture at 375px and 200% zoom for reachable close and checkbox.
- [ ] **Step 5: Commit** the scoped files with message `feat: show per-host welcome notice`.

### Task 4: 国际化面板、作者展开和统计卡

**Files:** Modify `booklist-enhancer.user.js`, `tests/booklist-enhancer.test.cjs`, `tests/dom-fixture.cjs`, `tests/fixture.html`.

**Interfaces:** Add `renderFullAuthor(card, enabled) -> boolean` independent of `renderFullTitle`; `refreshPanelLocale(locale)` rewrites tool-owned static/dynamic text without recreating inputs or rerunning filters; existing `renderFilterSummary()` keeps its non-`z-bookcard` contract. Task 1 `translate` supplies every string.

- [ ] **Step 1: Write failing tests.** Assert filter group precedes info group, automation group follows, ten-language selector defaults to auto and switching preserves form values and active filter state. Include `assert.equal(renderFullAuthor(card, true), true)` and assert the author text/link remain unchanged when the style toggles. Assert title/author four combinations, reversible `.book-info` growth with `min-height:88px`, late/replaced Shadow DOM; summary card keeps one instance, card-sized dimensions, three translated metrics, `Y=0` and unknown total. Test long translations, plain-text interpolation, focus labels and no required `:has()` functionality.
- [ ] **Step 2: Run** `node --test`; expected RED on missing UI/author assertions.
- [ ] **Step 3: Implement** ordered groups, language selector, `data-i18n`/translated dynamic rendering, full-author Shadow DOM style, refined summary card and local visual fixture. Keep `zble-settings-v2` filter semantics and drag/dock/Show more progress unchanged.
- [ ] **Step 4: Run** `node --test` and syntax check; expected PASS. Inspect desktop four-column, 375px, 200% zoom, dark and forced-colors layouts; record any unavailable visual mode as pending.
- [ ] **Step 5: Commit** the scoped files with message `feat: localize and refine booklist panel`.

### Task 5: 按新增数量驱动五连 Show more

**Files:** Modify `booklist-enhancer.user.js`, `tests/v3-runtime.test.cjs`, `tests/runtime-fixture.cjs`, `tests/fixture.html`.

**Interfaces:** Add `classifyBatchProgress({before,now,buttonExists,quietMs,elapsedMs}) -> 'wait'|'next'|'end'|'timeout'`; `runShowMoreFive({getCards,findButton,observe,clock,onProgress}) -> Promise<{completed:number,added:number,reason:string}>`. Use `PAGE_SIZE=20`, quiet window `750ms`, one-round timeout `20000ms`; count real cards, not filtered visible cards or `.zble-summary-card`. Button usability is checked only immediately before a click, never as a continuous batch-completion signal.

- [ ] **Step 1: Write failing tests.** Include `assert.equal(classifyBatchProgress({before:20,now:39,buttonExists:true,quietMs:750,elapsedMs:5000}), 'wait')` and the corresponding 40-card/750ms case returning `next`. Assert a 7-card final batch plus vanished button ends, changed title total does not affect target, 20-second partial batch times out, disappeared/unusable next button is never clicked, exceptions and second activation stop safely. Check exactly five sequential native `click()` calls only when five full batches arrive; temporary observer/timers disconnect after every outcome.
- [ ] **Step 2: Run** `node --test tests/v3-runtime.test.cjs`; expected RED on missing batch controller.
- [ ] **Step 3: Implement** one temporary observer per active task and the translated task-local progress/error UI. Re-find the native button before each click; do not track its loading class continuously, replace its text, call site private API, or modify the v2 progress estimate.
- [ ] **Step 4: Run** `node --test` and syntax check; expected PASS. On real logged-in site, manually verify at least one ordinary nonfinal Show more adds 20 before labeling automation compatible; if access is unavailable or count differs, leave the five-click feature unverified/disabled for release.
- [ ] **Step 5: Commit** the scoped files with message `feat: add count-driven show more automation`.

### Task 6: 双重确认的当前视图批量开页

**Files:** Modify `booklist-enhancer.user.js`, `tests/v3-runtime.test.cjs`, `tests/runtime-fixture.cjs`, `tests/fixture.html`.

**Interfaces:** Add `collectOpenTargets(cards, origin, isSiteVisible) -> string[]` with URL validation and stable de-duplication; `canOpenAll({enabled,filtersReady,unknownDownloads,openTabAvailable}) -> {allowed:boolean,reason:string}`; `confirmBulkOpen({urls,getCurrentTargets,getDomainEnabled,showDialog}) -> Promise<boolean>` for both dialogs and pre-open snapshot recheck; `runOpenAll({urls,openTab,delay,isSourceAlive,onProgress}) -> Promise<{attempted:number,submitted:number,failed:number}>`. Keep a page-lifetime `hasOpenedOnThisPage` flag only; do not persist URLs/counts/history. `showDialog` returns `Promise<boolean>` and restores focus on close.

- [ ] **Step 1: Write failing tests.** Assert disabled-by-default per host, pending/invalid download or empty rule blocks opening, hidden/invalid/cross-origin/non-`/book/`/duplicate card links excluded, zero targets skip dialogs. Include `assert.deepEqual(collectOpenTargets(cards, origin, isSiteVisible), [validUniqueBookUrl])` for mixed links. Cancel first or second dialog yields zero calls; changed cards/filter/host permission before first call aborts with zero calls; repeat in same page adds the warning but still asks twice. Mock `GM_openInTab` success/throw/promise rejection, assert one attempt per URL, `submitted` not labeled loaded, no `window.open` fallback, no hard cap, source page gone stops, and dialog Escape/focus restoration/long translated text.
- [ ] **Step 2: Run** `node --test tests/v3-runtime.test.cjs`; expected RED on missing collection/gate/dialog/runner.
- [ ] **Step 3: Implement** per-host opt-in, short translated in-script two-step confirmation, snapshot revalidation immediately before first call, background `GM_openInTab` with `active:false` and `350ms` submission spacing. Add a disabled「批量加入收藏 · 开发中」button without attaching a mutation handler.
- [ ] **Step 4: Run** `node --test` and syntax check; expected PASS. In real browsers exercise only a tiny synthetic/mock target set; never bulk-open the real page for QA.
- [ ] **Step 5: Commit** the scoped files with message `feat: add guarded bulk book opening`.

### Task 7: 回归、安装说明与三浏览器验收记录

**Files:** Modify `README.md`, `tests/fixture.html`; create `docs/superpowers/specs/2026-10-04-booklist-enhancer-v3-test-record.md`; adjust only failing v3-related tests/implementation files if verification exposes defects.

**Interfaces:** No new runtime API. Document exact install/update steps and User matches example; the test record distinguishes automated, local visual and live-site outcomes.

- [ ] **Step 1: Run a coverage audit** for `@name`, six site-wide matches, ten language-pack completeness, old settings fields, paused download gate, summary/Show more regressions and no enabled favorite action. For any missing behavior write its failing assertion, run `node --test` to observe RED, then make the narrow fix before continuing; do not force a passing requirement to fail artificially.
- [ ] **Step 2: Update** README with domain matches, mirror matching, language fallback, per-host preferences, both automation risks and known unverified browsers/sites.
- [ ] **Step 3: Run** `node --test`, `node --check booklist-enhancer.user.js`, and `git -c safe.directory=D:/WorkingCloud/zlibrary-booklist-enhancer diff --check`; expected all exit 0. Confirm changes did not erase existing v2 tests or settings.
- [ ] **Step 4: Record** Chrome/Firefox/Edge browser version, Tampermonkey version/injection mode, main frame/iframe, late injection, BFCache, storage blocked, dark/reduced-motion/forced-colors, 200% zoom, Shadow DOM/Show more and background-tab behavior in the v3 test record. Mark inaccessible hosts and unrun browsers「未验证」; do not infer live success from unit tests.
- [ ] **Step 5: Commit** docs, fixture and scoped fixes with message `docs: record v3 compatibility and usage`.
