# Z-lib Booklist Enhancer v3.1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 分离全局设置与逐筛选器配置，更新自动化按钮反馈，并为 Show more 停滞提供 5＋5 秒保护及仅手动触发的重置入口。

**Architecture:** 保持单文件 Userscript 和现有存储字段；面板重排只改变控件归属，全部筛选器仍由同一轮刷新处理。Show more runner 报告真实点击、失败和无进展阶段；书单级观察器另行跟踪手动/工具发起的原站点击，达到卡住条件后才开放一次性重置。原站禁用状态只在用户点击重置时作有限、可验证的 DOM 恢复，不自动发加载请求。

**Tech Stack:** JavaScript Userscript、Tampermonkey、Node.js 内建 `node:test`、现有本地 DOM/运行时夹具；无新增依赖。

**Spec:** `docs/superpowers/specs/2026-10-04-booklist-settings-config-design.md`，并保留 `docs/superpowers/specs/2026-10-04-booklist-enhancer-v3-design.md` 中未被覆盖的行为。

## Global Constraints

- 版本递增为 `3.1.0-dev`；十种语言 `en`、`zh-CN`、`zh-TW`、`fr`、`de`、`ru`、`ja`、`ko`、`es`、`pt-BR` 的新增键全部齐全。
- 沿用 `zble-settings-v2` 和逐域名偏好，不重置筛选规则；不持久化 Show more 点击、失败或卡住记录。
- 初始 5 秒保持 `[运行中]`；再连续 5 秒无真实新书卡，显示 `[可能失败，X 秒后放弃]`，`X=5…1`；连续 10 秒无进展停止。新增真实书卡立即恢复运行文案并重置时钟。
- `已点 X 次` 只统计本工具发出的原站点击尝试；只有 `Y>0` 才附加 `失败 Y 次`。手动点击可触发卡住检测，但不改变 `X/Y`。正常末批不足 20 本不算失败。
- 重置入口默认禁用；只有已观察到原站或工具的有效点击、连续 10 秒无新增书卡、且同一书单的原站按钮仍不可用时才启用。点击重置只尝试一次，不自动点击、不重试网络、不调用站点私有接口；无法恢复时提示刷新。
- 下载状态等待、统一筛选、原站 Show more 页数估算、批量开页双重确认、批量收藏禁用入口保持原语义。真实 Chrome、Firefox、Edge／站点验收不可由 Node 夹具代替。

## Review Focus

1. 原站书卡分批迟到（每 4～9 秒新增一张）：倒计时必须撤销并重置，不能提前判失败（Task 2、3）。
2. 原站按钮初始禁用或已到书单末尾：没有有效点击就绝不启用重置（Task 3）。
3. 用户手动点击、工具程序点击、书单切换与按钮替换交错：只跟踪当前有效尝试，手动点击不污染工具累计数，旧节点不可重置（Task 3）。
4. 后台计时器被节流或 BFCache 恢复：根据绝对时间计算 `5…1`，路由离开时清理任务，不能补点或跨书单重置（Task 2、3）。
5. 重置后网站内部加载锁仍在、或原站再次禁用按钮：不能宣称成功、不能自动重试，须给出刷新建议（Task 3）。

## File Map

- `booklist-enhancer.user.js`：唯一安装产物；增加配置展开控制、翻译、Show more 无进展状态、书单级卡住观察及重置、批量开页提示与按钮样式。
- `tests/booklist-enhancer.test.cjs`：纯函数、翻译、设置迁移和书卡/按钮 DOM 单测。
- `tests/v3-runtime.test.cjs`：扩充五连、手动点击观察、倒计时、重置和批量开页流程测试。
- `tests/runtime-fixture.cjs`、`tests/fixture.html`：增加可控时钟、按钮禁用/替换、书卡增长及视觉状态夹具。
- `README.md`：安装更新、设置/配置区别及手动重置风险与局限。
- `docs/superpowers/specs/2026-10-04-booklist-v31-test-record.md`：记录自动化、真实站点与三浏览器验收，未运行项目标「未验证」。

---

### Task 1：全局设置与逐筛选器配置

**Files:** Modify `booklist-enhancer.user.js`, `tests/booklist-enhancer.test.cjs`, `tests/fixture.html`.

**Interfaces:** `createExclusiveDisclosure(items, flushPending) -> {toggle(id),closeAll(),current()}`；只控制全局设置与三个配置面板的展开状态，不修改筛选参数。原有 `settings` 字段与 `scheduleRefresh()` 保持不变。

- [ ] **RED：** 增加测试，断言四个入口互斥、齿轮点击不改变相邻开关、关闭配置冲刷待提交文本、下载筛选开关置灰时配置仍可打开、折叠主面板不改规则；十语言的新文案/ARIA 键齐全且切换语言不丢表单值。
- [ ] 运行 `node --test tests/booklist-enhancer.test.cjs`；预期新增测试因缺少展开控制器或新结构失败。
- [ ] **GREEN：** 将格式、下载、年份输入移至各自内联配置；标题栏改扳手 SVG，只保留全局项与「关于」；信息显示文案按规格更新。保留原即时保存与统一筛选调用。
- [ ] 运行 `node --test tests/booklist-enhancer.test.cjs`、`node --check booklist-enhancer.user.js`；预期通过。检查 375px、200% 缩放和深浅模式夹具，未能视觉检查则记录待验。
- [ ] 只提交本任务文件，提交信息 `feat: separate settings from filter configurations`。

### Task 2：五连无进展保护和累计计数

**Files:** Modify `booklist-enhancer.user.js`, `tests/v3-runtime.test.cjs`, `tests/booklist-enhancer.test.cjs`, `tests/runtime-fixture.cjs`.

**Interfaces:** `classifyShowMoreIdle(idleMs) -> {phase:'running'|'warning'|'timeout',seconds:number|null}`；扩展 `runShowMoreFive({...,onAttempt}) -> Promise<{completed,added,attempted,failed,reason}>`，`onAttempt(button)` 在每次原站 `click()` 调用前恰好触发一次，`onProgress` 另带阶段与剩余秒数。`attempted` 在原站 `click()` 调用前加一，`failed` 仅在该次调用抛错或连续 10 秒无进展时加一。Task 3 消费 `onAttempt(button)`。

- [ ] **RED：** 用假时钟覆盖 0、4.999 秒仍运行、5 秒开始警告、9 秒显示 `1`、10 秒停止；新增第 1～19 张书卡后恢复运行并重新计时、20 张稳定后才继续、末批不足 20 且按钮消失不计失败、点击抛错计失败。两次运行累计 `X=5→10`，`Y=0` 时无失败字段、`Y>0` 时准确显示；手动点击不改变累计数。后台一次跳过多秒时无负数或补点。
- [ ] 运行 `node --test tests/v3-runtime.test.cjs tests/booklist-enhancer.test.cjs`；预期新增测试失败。
- [ ] **GREEN：** 以真实书卡新增时间替换原单轮 20 秒绝对超时；在工具按钮中渲染运行、警告、最终累计文案，移除其下方可见状态段落。失败时清除忙碌锁；不改变原站页数估算。
- [ ] 运行 `node --test` 和 `node --check booklist-enhancer.user.js`；预期旧五连回归与新测试全通过。
- [ ] 只提交本任务文件，提交信息 `feat: guard show more with idle countdown`。

### Task 3：原站卡住检测与手动重置

**Files:** Modify `booklist-enhancer.user.js`, `tests/v3-runtime.test.cjs`, `tests/booklist-enhancer.test.cjs`, `tests/runtime-fixture.cjs`, `tests/fixture.html`.

**Interfaces:** `createShowMoreStallTracker({clock,getCards,getButton,onState}) -> {noteManualClick(button),noteToolClick(button),check(),dispose()}`，由书卡/按钮观察与绝对时间计时调用 `check()`；`onState` 提供当前书单的 `idleMs`、按钮可用性和一次性 `resetEligible`。`attemptShowMoreReset({button,stillEligible}) -> {attempted:boolean,interactive:boolean}` 只处理已核实的禁用属性/状态，不合成点击。Task 2 的 `onAttempt(button)` 接入 `noteToolClick(button)`；手动点击监听只接收可信用户事件，避免程序点击双重登记。

- [ ] **调查：** 在已登录示例书单记录原站按钮成功加载前/加载中/结束时的 `disabled`、`aria-disabled`、可见性及可核实的禁用样式；不能复现卡住时不得推断原站内部锁已解除。将可恢复的具体 DOM 状态和仍未验证的状态记入测试记录；只对可核实状态写恢复适配。
- [ ] **RED：** 覆盖手动/工具点击后 10 秒无书卡增长且按钮禁用→重置入口启用；初始禁用、自然恢复、按钮消失、末尾、迟到增长、路由切换、按钮替换→入口禁用；重置时重新核验、一次性尝试、绝不合成站点点击或重复请求。若可核实 DOM 状态仍不可用，显示刷新提示且五连入口保持不可点击；恢复后不让旧事件再次启用。
- [ ] 运行 `node --test tests/v3-runtime.test.cjs tests/booklist-enhancer.test.cjs`；预期新增测试失败。
- [ ] **GREEN：** 安装仅在活动书单存在的手动点击监听、书卡观察和计时清理；新增默认禁用的重置按钮。用户点击时有限恢复当前原站按钮可核实的禁用状态，更新工具入口和提示。不能确认的类名或站点私有状态保持不动。
- [ ] 运行 `node --test`、`node --check booklist-enhancer.user.js`；预期通过。真实站点未复现时标「本地夹具通过、真实站点未验证」，不声称实际解锁成功。
- [ ] 只提交本任务文件，提交信息 `feat: offer manual recovery for stalled show more`。

### Task 4：批量开页提示与自动化按钮视觉状态

**Files:** Modify `booklist-enhancer.user.js`, `tests/v3-runtime.test.cjs`, `tests/booklist-enhancer.test.cjs`, `tests/fixture.html`.

**Interfaces:** 保留 `currentBulkGate()` 的安全判定；未授权点击先经单按钮信息弹窗返回，只有已授权且其余条件有效才调用现有 `confirmBulkOpen()` 的两次确认。按钮 CSS 以 `:active`、运行态、失败态分别表达状态。

- [ ] **RED：** 未授权点击只显示「请到设置菜单中打开」、关闭后零开页；授权后两次确认仍不可跳过；空目标/筛选待定/API 不可用零开页。自动化按钮按下、运行、失败的状态与 ARIA 区别明确；正常完成或取消不留失败态，深色/高对比度和 `prefers-reduced-motion` 有可读样式。
- [ ] 运行 `node --test tests/v3-runtime.test.cjs tests/booklist-enhancer.test.cjs`；预期新增测试失败。
- [ ] **GREEN：** 复用现有对话层的焦点/ESC 规则构建单按钮说明弹窗，先检查本站授权再检查其余安全门控；更新按钮反色和非纯红失败样式，收藏入口保持禁用。
- [ ] 运行 `node --test`、`node --check booklist-enhancer.user.js`；预期通过。
- [ ] 只提交本任务文件，提交信息 `feat: clarify bulk opening and automation states`。

### Task 5：说明、回归与兼容性记录

**Files:** Modify `README.md`, `tests/fixture.html`; create `docs/superpowers/specs/2026-10-04-booklist-v31-test-record.md`;仅在发现缺口时修改对应测试/实现。

**Interfaces:** 不增加运行时 API；把自动化结果和真实浏览器结果分开记录。

- [ ] 对照规格逐项核查全局/逐筛选配置、即时生效、十语言、5＋5 秒、累计次数、手动/工具点击、一次性重置、批量开页双确认和 v3 下载门控；若缺测试，先写失败测试再作窄修复。
- [ ] 更新 README 的安装版本、两类齿轮/扳手、失败计数、手动重置的有限保证与刷新建议。
- [ ] 运行 `node --test`、`node --check booklist-enhancer.user.js`、`git diff --check`；预期全部退出码 0。核对 `git status` 没有无关文件被提交。
- [ ] 分别记录 Chrome、Firefox、Edge 的浏览器与 Tampermonkey 版本、登录站点、正常/卡住 Show more、浅/深/高对比度、键盘/鼠标和 200% 缩放结果；没测的明确写「未验证」。真实站点不得为测试而执行批量开页或收藏。
- [ ] 只提交文档、夹具和必要窄修复，提交信息 `docs: record v3.1 behavior and verification`。
