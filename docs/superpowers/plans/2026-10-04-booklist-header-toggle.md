# 标题栏点击折叠实施与测试方案

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 单击或双击书单增强面板标题栏时，均只切换一次展开/收起状态。

**Architecture:** 保留现有齿轮、折叠按钮及拖动吸附逻辑。标题栏的第一次 `click` 立即切换，连续点击的第二次（`detail >= 2`）忽略；拖动超过既有 5px 阈值后忽略其随后的合成点击。用一个小控制器封装手势状态，并由现有面板事件绑定调用，不增加计时器。

**Tech Stack:** 单文件 JavaScript Userscript、Node.js `node:test`；不增加依赖。

**Spec:** 本次用户请求；保留 `docs/superpowers/specs/2026-10-04-booklist-enhancer-v3-design.md` 的面板与拖动行为。

## 约束与测试重点

- 标题文本及标题栏空白处可点击；齿轮、折叠按钮及其内部 SVG 点击不能额外触发标题栏切换。
- 单击立即切换一次；双击的完整事件序列也只切换一次，无等待延迟。拖动结束的合成点击不能切换；下一次正常点击仍可切换。
- 非主键点击不切换；原有按钮及拖动测试继续通过。此处采用标准 `click.detail` 连击计数；若浏览器在布局变化后将第二击落到站点内容上，需在真实浏览器验收中单独检查。

## 文件

- `booklist-enhancer.user.js`：增加标题栏点击控制器并接入现有面板事件。
- `tests/booklist-enhancer.test.cjs`：增加单击、双击、按钮、非主键与拖动回归测试。
- `README.md`：补充标题栏操作说明。
- 脚本元数据版本与 README 递增为 `3.0.1-dev`，让脚本管理器识别更新。

## Task 1：标题栏点击切换

- [x] 先在 `tests/booklist-enhancer.test.cjs` 写控制器行为测试：单击一次、`detail=1` 后 `detail=2` 双击一次、按钮及 SVG 不切换、拖动合成点击不切换而下一次单击切换、非主键不切换。
- [x] 运行 `node --test tests/booklist-enhancer.test.cjs`，确认新增测试因缺少控制器而失败。
- [x] 在 `booklist-enhancer.user.js` 实现 `createPanelHeaderToggle(toggle)`，返回 `onPointerDown()`、`onPointerEnd(moved)`、`onClick(event)`；接入标题栏 `pointerdown`、`pointerup`/`pointercancel` 和 `click`，复用已有 `setCollapsed`。
- [x] 运行 `node --test tests/booklist-enhancer.test.cjs`、`node --test`、`node --check booklist-enhancer.user.js` 与 `git diff --check`；均通过，完整测试 70/70。
- [x] 更新 `README.md` 的标题栏说明；复核差异，只提交本次文件。

## 手动验收（不以单元测试冒充）

在 Chrome、Firefox、Edge 的书单页面分别检查：标题栏单击/双击各切换一次；齿轮和折叠按钮独立工作；拖动吸附后不折叠；顶部、侧边及底部停靠时标题栏仍可操作。无法访问的浏览器/真实站点明确标为未验证。
