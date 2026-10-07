# Changelog / 更新日志

版本记录主要依据本仓库的提交历史。Git 历史从 `1.0.2-dev` 开始；更早的两个开发版本依据仓库内的历史测试记录补记。开发版本不代表完成了真实站点验收。

Version notes are based mainly on this repository's commit history. Git history starts at `1.0.2-dev`; the two earlier development versions are reconstructed from the historical test record. Development versions were not fully validated on the live site.

## 4.0.5 — 2026-10-08

- Added filter summary cards to all four supported cover lists: home recommendations, similar books, Z-Recommend results, and popular books. The cards count loaded and matching books without inventing a site total.
- Added independent, off-by-default title and author display switches for those lists. Display options now open there with controls enabled according to the page.
- 为首页推荐、详情页相似推荐、Z-Recommend 结果和热门榜单增加筛选统计卡片，只显示已加载和筛选后数量，不推测站点总数。
- 为这些封面列表增加默认关闭的书名、作者名独立开关；「信息显示」按页面启用适用选项。

## 4.0.4

Not found.

## 4.0.3 — 2026-10-07

- Added a dismissible UI Enhance compatibility notice, a shared details dialog, and warning links beside its booklist action buttons.
- 增加可关闭的 UI Enhance 兼容性提示、统一详情说明，以及书单操作按钮旁的冲突提示链接。

## 4.0.2 — 2026-10-07

- Made the manual Show more availability reset usable on live booklists and clarified its limited effect.
- 让「重置 Show more 按钮可用性」可在实际书单中使用，并说明其作用边界。

## 4.0.1 — 2026-10-07

- Fixed filtering and bulk opening of recommendations rendered inside `z-masonry` Shadow DOM; followed component rerenders.
- 修复 `z-masonry` Shadow DOM 中实际渲染的推荐卡片筛选与批量打开，并跟随组件重绘。

## 4.0 — 2026-10-07

- Extended filtering to search results and download status filtering to home recommendations, similar books, Z-Recommend, and popular lists. Extended bulk opening to the new lists.
- 将筛选扩展到搜索结果，并为首页推荐、相似图书、Z-Recommend 和热门榜单增加下载状态筛选；批量打开也支持这些页面。

## 3.3.2 — 2026-10-06

- Applied the `1K → 999` adjustment only to Show more page estimates; kept the site's `1K` label in the summary card.
- 仅在 Show more 页数估算中将 `1K` 按 999 计算；统计卡片保留网站显示的 `1K`。

## 3.3.1 — 2026-10-06

- Refined localized interface copy and corrected handling of a `1K` book count.
- 润色多语言界面文案，修正 `1K` 书籍数量的处理。

## 3.3.0 — 2026-10-06

- Added file-size filtering and optional size badges; made Filters, Display options, and Automation independently collapsible, and refined English copy.
- 增加文件大小筛选和可选的大小标签；「筛选器」「信息显示」「自动化」可以分别收起，并改进英文文案。

## 3.2.1 — 2026-10-06

- Fixed the card height when long author names are fully displayed.
- 修复完整显示超长作者名时的卡片高度。

## 3.2.0 — 2026-10-06

- Added automation controls and clearer feedback for Show more, reset, and bulk opening.
- 增加自动化控制，并改进 Show more、重置和批量打开的反馈。

## 3.1.2 — 2026-10-05

- Updated the settings and filter icons.
- 更新设置与筛选器图标。

## 3.1.1 — 2026-10-05

- Localized userscript metadata for the supported interface languages.
- 为支持的界面语言补齐用户脚本元数据译文。

## 3.1.0 — 2026-10-05

- Prepared the public userscript release and marketplace metadata; polished interface copy and added license information.
- 准备公开发布与脚本平台元数据，润色界面文案并补充许可证信息。

## 3.1.0-dev — 2026-10-04

- Separated global settings from filter configurations; added Show more stall handling and guarded manual recovery, with clearer bulk-opening feedback.
- 将全局设置与筛选配置分开；增加 Show more 停滞处理和受限的手动恢复，并改进批量打开反馈。

## 3.0.1-dev — 2026-10-04

- Made the panel title bar toggle the panel on a single click.
- 支持单击面板标题栏收起或展开面板。

## 3.0.0-dev — 2026-10-04

- Expanded route and site handling, localized the panel, added per-site welcome preferences, count-based Show more automation, and guarded bulk opening.
- 扩展页面与站点识别，加入多语言面板、按站点保存的启动提示偏好、定次 Show more 连点和受控批量打开。

## 2.0.1-dev — 2026-10-03

- Refined book-card presentation and dark-theme styling.
- 改进书卡显示与深色主题样式。

## 2.0.0-dev — 2026-10-03

- Added year rules, combined booklist filtering, metadata and long-title display controls, a grouped settings panel, summary cards, progress estimates, and panel docking.
- 加入年份规则、统一的书单筛选、书籍信息与长标题显示控制、分组面板、统计卡片、进度估算和面板吸边。

## 1.0.2-dev — 2026-10-03

- Set the early booklist-only baseline and revised the built-in site list to the four domains confirmed at the time.
- 确立早期仅支持书单的基线，并按当时确认的四个域名调整内置站点名单。

## 1.0.1-dev — 2026-10-03

- Expanded the early `/booklist/*` site matches; the domain list was revised in `1.0.2-dev`.
- 扩大早期 `/booklist/*` 站点匹配范围；域名名单随后在 `1.0.2-dev` 调整。

## 1.0.0-dev — 2026-10-03

- Introduced the first rewritten booklist userscript with format and download-state filtering, card labels, and loading statistics.
- 初次重写书单脚本，加入格式与下载状态筛选、书卡标签和加载统计。
