# Z-Library 书单增强 v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将现行 Userscript 升级为已审阅的 v2：信息显示控制、三项统一筛选、卡片内统计、Show more 进度、即时设置及可折叠拖动浮窗。

**Architecture:** 保持 `booklist-enhancer.user.js` 为可直接安装的独立脚本，沿用其 Node-only 导出以测试纯逻辑。站点适配器只读活动书单和下载状态，统一刷新一次计算所有卡片；脚本专属节点负责浮窗、统计卡及 Show more 文案，避免替换站点元素。现有 `tests/dom-fixture.cjs` 扩展为轻量单元夹具，`tests/fixture.html` 承担真实布局和交互验收。

**Tech Stack:** JavaScript Userscript、Node.js 内建 `node:test`、本地 HTML 夹具；无运行时依赖或额外网络请求。

**Spec:** `docs/superpowers/specs/2026-10-03-booklist-enhancer-v2-design.md`；验收矩阵：`docs/superpowers/specs/2026-10-03-booklist-enhancer-v2-test-plan.md`。

## Global Constraints

- `@match` 限于 `z-lib.sk`、`z-library.sk`、`1lib.sk`、`libb.la`、`z-library.im`、`z-lib.fm` 的 HTTPS `/booklist/*`；不匹配 `.biz` 或全域通配。
- 不请求额外书籍数据，不自动点击 Show more，不保存或恢复阅读断点；不改站点书单、排序、下载记录或原生 Show more 点击处理。
- 初次格式规则仍为空；下载映射为空时成功与失败不能区分，下载筛选继续暂停；未知下载状态不得判成未下载。
- 当前设置键 `zble-settings-v2` 中的 `showFormat`、`filterFormat`、`filterDownload`、`formats`、`custom`、`downloadRule` 必须迁移保留；新设置按规格默认。
- 年份范围端点包含，非空时只接受十进制整数 `1–9999`；空/冲突的年份规则 fail-open；缺失年份仅在有效范围且例外开关开启时纳入。
- `Y` 仅计本工具实际生效的筛选交集；每批按约 20 本估算展开和页数，不记录真实点击次数；原生 Show more 消失时无备用进度。
- 不持久化书名、ISBN、下载映射、页面令牌、书籍链接或进度；站点不匹配结构时不创建界面、不改 DOM。

## Review Focus

以下五类容易遗漏的输入必须在对应任务中加入测试：

1. 站点在切换书单时复用/替换书卡及 Shadow DOM：元信息恢复、格式徽标与展开样式不能泄漏到新卡（Task 3）。
2. 同一帧连续改三个筛选设置、同时追加书卡：只排一次刷新，`X/Y` 不包含统计卡（Task 2、5）。
3. 年份属性为空、`0`、非数字，且上/下限输入处于半输入状态：无误隐藏其他有效规则筛出的书（Task 1、2）。
4. Show more 的 `.content` 文案进入加载中、按钮被替换或消失：脚本不覆盖原文、不重复进度或遗留进度（Task 5）。
5. 窄屏下拖动后缩放、触屏释放、误触齿轮/折叠按钮：面板仍可触及，不误触书卡或 Show more（Task 6）。

---

### Task 1: 六域匹配、设置迁移与年份规则

**Files:** Modify `booklist-enhancer.user.js`, `tests/booklist-enhancer.test.cjs`.

**Interfaces:** Produce `sanitizeSettings(saved) -> Settings` with `showLanguage=true`, `showYear=true`, `showFullTitle=false`, `filterYear=false`, `yearMin=''`, `yearMax=''`, `includeMissingYear=false`; produce `parseYearRule(settings) -> {active:boolean,min:number|null,max:number|null,error:string}` and `matchesYear(rawYear, rule, includeMissingYear) -> boolean`. Existing setting names remain unchanged.

- [ ] **Step 1: Write failing tests.** Extend the domain test to assert exactly six `@match` hosts. Assert old saved settings survive; malformed new booleans and non-string year inputs fall back safely. For `parseYearRule`, assert blank/one-sided/equal/closed bounds, `0`/`-1`/`1.5`/`abc`/`10000`/min>max; for `matchesYear`, assert both endpoints included and missing/`0`/invalid excluded unless a valid rule plus exception permits them.
- [ ] **Step 2: Run** `node --test tests/booklist-enhancer.test.cjs` **and observe RED** on new assertions; expected failures are missing fields/functions and four-domain metadata.
- [ ] **Step 3: Implement** only header metadata, settings sanitization and the two pure year helpers in `booklist-enhancer.user.js`; export helpers in Node. Keep year input strings when validly typed even if their values conflict, so the UI can show and repair them.
- [ ] **Step 4: Run** `node --test tests/booklist-enhancer.test.cjs` and `node --check booklist-enhancer.user.js`; expected all pass and exit 0.
- [ ] **Step 5: Commit** the scoped files with `git commit -m "feat: add v2 settings and year rules"`.

### Task 2: 一次计算三项筛选交集

**Files:** Modify `booklist-enhancer.user.js`, `tests/booklist-enhancer.test.cjs`, `tests/dom-fixture.cjs`.

**Interfaces:** Consume `parseYearRule`/`matchesYear` (Task 1) and existing `classifyDownload`; produce `compileFilters(settings, downloadReady, lookup) -> FilterContext` and `evaluateCard(info, context) -> {visible:boolean,download:string}`. `readCardData(card)` adds `language` and `year` from attributes. Adapter `refresh()` compiles once, enumerates real `.readlist-view > z-bookcard` once, then evaluates each card once. Preserve the current `evaluateCard(info, settings, ready, lookup)` only as a compatibility wrapper if needed by old tests.

- [ ] **Step 1: Write failing tests.** Assert format ∩ download ∩ year, one paused condition not blocking other active conditions, zero/invalid year behavior, and unknown download state staying visible unless another active condition excludes it. Add a count-spy fixture that checks one compilation and one card enumeration per refresh despite several settings changes in one frame.
- [ ] **Step 2: Run** `node --test tests/booklist-enhancer.test.cjs` **and observe RED** on new integration assertions.
- [ ] **Step 3: Implement** compiled filter context and one-pass evaluation; remove redundant per-card parsing and keep scheduling coalesced with `requestAnimationFrame`. Update active-list observation for `year`, `language` and replaced cards without observing script-owned panel nodes.
- [ ] **Step 4: Run** `node --test tests/booklist-enhancer.test.cjs` and syntax check; expected all pass.
- [ ] **Step 5: Commit** the scoped files with `git commit -m "feat: evaluate booklist filters in one pass"`.

### Task 3: 可逆元信息与完整书名

**Files:** Modify `booklist-enhancer.user.js`, `tests/booklist-enhancer.test.cjs`, `tests/dom-fixture.cjs`, `tests/fixture.html`.

**Interfaces:** Produce `renderCardMeta(card, {showLanguage,showYear}) -> boolean` and `renderFullTitle(card, enabled) -> boolean`; both return false if the needed Shadow DOM has not appeared. Keep original desktop/mobile idle text per DOM node (not as persisted settings), and never replace native hover nodes or links. Existing `renderFormatBadge` must remain idempotent alongside metadata rewrites.

- [ ] **Step 1: Write failing tests.** Cover all four display combinations on desktop and mobile, `year="0"`, repeated toggle/restore, late Shadow DOM, component replacement and an unsupported metadata shape that leaves the original text intact. Assert format badges remain singletons and full-title style toggling does not alter title text/link.
- [ ] **Step 2: Run** `node --test tests/booklist-enhancer.test.cjs` **and observe RED** on missing rendering interfaces.
- [ ] **Step 3: Implement** only reversible text-node handling and script-scoped Shadow DOM title styles; extend the local browser fixture with desktop/mobile meta and a six-line title.
- [ ] **Step 4: Run** Node tests and syntax check; expected all pass. Inspect local fixture at desktop four columns and 375px for non-overlap and restored two-line truncation; if not visually checked, record it as pending rather than claiming pass.
- [ ] **Step 5: Commit** the scoped files with `git commit -m "feat: control card metadata and long titles"`.

### Task 4: 分组浮窗、即时设置与规则摘要

**Files:** Modify `booklist-enhancer.user.js`, `tests/booklist-enhancer.test.cjs`, `tests/fixture.html`.

**Interfaces:** `createPanel()` renders the two categories and seven main switches from sanitized settings. Settings controls update settings and call `scheduleRefresh()` immediately; `#zble-custom`, `#zble-year-min`, `#zble-year-max` debounce by about 250 ms and flush on Enter, blur or gear close. Produce pure `formatRuleSummary(settings, gateState, yearRule) -> {format:string,download:string,year:string}` for visible labels and accessible full text. The gear changes visibility only.

- [ ] **Step 1: Write failing tests.** Assert exact Chinese labels/defaults, empty and conflict summaries, year/format input debounce and Enter/blur/gear flush, dropdown/checkbox immediate persistence, and waiting download summary plus disabled/spinning control. Test a sequence of settings edits whose stored values survive panel close/reopen.
- [ ] **Step 2: Run** `node --test tests/booklist-enhancer.test.cjs` **and observe RED** on new UI/summary behavior.
- [ ] **Step 3: Implement** grouped panel, visually separate settings area, inline status/errors and immediate handlers; remove old stats/status bar from panel. Keep the User matches help link. Ensure focus styles, accessible labels and reduced-motion spinner fallback.
- [ ] **Step 4: Run** Node tests and syntax check; expected all pass. Inspect local fixture for focus order and narrow-screen scrolling.
- [ ] **Step 5: Commit** the scoped files with `git commit -m "feat: add grouped immediate-settings panel"`.

### Task 5: 统计卡与 Show more 进度

**Files:** Modify `booklist-enhancer.user.js`, `tests/booklist-enhancer.test.cjs`, `tests/dom-fixture.cjs`, `tests/fixture.html`.

**Interfaces:** Produce `renderFilterSummary(list, stats, active, notices) -> void` using a non-`z-bookcard` script-owned element; produce `renderShowMore(main, stats) -> void` that adds one script-owned child after native `.content` without replacing original text or click handler. Consume existing `computeStats({loaded,matched,total})`; format `X=0` as “尚无已加载书籍”.

- [ ] **Step 1: Write failing tests.** Assert stats card appears for any switched-on filter, even paused/empty; disappears when all three are off; remains visible at Y=0; does not change X/Y or download lookup count. Assert 0/20/40/47, missing/contradictory total, native text loading transition, replaced/removed Show more, no duplicate progress, and original click handler unchanged.
- [ ] **Step 2: Run** `node --test tests/booklist-enhancer.test.cjs` **and observe RED** on new DOM outputs.
- [ ] **Step 3: Implement** both renderers within the single refresh cycle. Limit the MutationObserver to native list/button changes; script-owned text mutations must not loop. Keep page progress absent when native button is absent.
- [ ] **Step 4: Run** Node tests and syntax check; expected all pass. Exercise local fixture Show more and filtering at desktop/narrow widths.
- [ ] **Step 5: Commit** the scoped files with `git commit -m "feat: show filter summary card and load progress"`.

### Task 6: 折叠、拖动、边缘停靠

**Files:** Modify `booklist-enhancer.user.js`, `tests/booklist-enhancer.test.cjs`, `tests/fixture.html`.

**Interfaces:** Produce `snapPanelPosition(rect, viewport) -> {edge:'top'|'right'|'bottom'|'left',offset:number,left:number,top:number}` and `clampPanelPosition(saved, viewport, panelSize) -> {left:number,top:number}`. Persist only snap edge/offset as a UI preference; never persist collapsed state. Pointer handlers start only on non-button header area. Settings include `重置浮窗位置`.

- [ ] **Step 1: Write failing tests.** Cover all four nearest edges, viewport resize clamping, default expanded state, collapse-only header, gear from collapsed state, reset, pointer-cancel, and header-button clicks not starting drag. Add local 375px fixture scenario for first in-flow placement and first drag to fixed edge.
- [ ] **Step 2: Run** `node --test tests/booklist-enhancer.test.cjs` **and observe RED** on missing position and collapse behavior.
- [ ] **Step 3: Implement** accessible V-shaped collapse control and Pointer Events dragging/snap, using a movement threshold to distinguish click from drag. Preserve filter behavior while hidden, bound the panel to viewport, and clamp persisted location after resize.
- [ ] **Step 4: Run** Node tests and syntax check; expected all pass. Use the fixture to inspect mouse/touch, focus, collapsed header and four-edge placement; mark untested device paths explicitly.
- [ ] **Step 5: Commit** the scoped files with `git commit -m "feat: collapse and dock enhancer panel"`.

### Task 7: 文档、回归与真实站点验收

**Files:** Modify `README.md`, `DESIGN.md`, `TEST_PLAN.md`, `docs/superpowers/specs/2026-10-03-booklist-enhancer-v2-test-plan.md` only where actual results warrant; modify script/tests only for test-proven regressions.

**Interfaces:** No new runtime interfaces. Deliver one standalone `booklist-enhancer.user.js` and an evidence table separating automated, local-browser and real-site checks.

- [ ] **Step 1: Add final regression tests** for any found issue, observe each RED, then make the smallest repair and observe GREEN.
- [ ] **Step 2: Run fresh full checks:** `node --test tests/booklist-enhancer.test.cjs`, `node --check booklist-enhancer.user.js`, and `git diff --check`; expected exit 0 and no test failures.
- [ ] **Step 3: Browser-check** desktop four columns and 375px local fixture for long title/layout, settings, Show more, summary, collapse, drag and no console errors. On the logged-in `1lib.sk` page, verify key paths without downloads or booklist writes. Try each other matched domain's actual booklist only if accessible; label unavailable or unlogged-in domains unverified, not passed.
- [ ] **Step 4: Update docs** with exactly observed results, new six-domain scope, version/install instructions, and limitations. Do not turn pending checks into success claims.
- [ ] **Step 5: Re-run checks and commit** the scoped files with `git commit -m "docs: record v2 usage and verification"`.

## Execution handoff

The user asked to start work and initialize Git. Git initialization and the baseline commit may proceed now; product-code tasks above await the user's review of this written plan and choice of execution method. Since this task has not requested subagents, choose native inline execution unless the user explicitly requests delegation.
