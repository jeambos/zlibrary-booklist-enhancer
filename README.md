# Z-lib Booklist Enhancer

[简体中文](#简体中文) · [English](#english)

## 简体中文

### 这是什么？

Z-lib Booklist Enhancer 以书单增强为核心：它能筛选书单、改善书籍信息的显示、查看加载进度，并按需连点「Show more」。4.0 还支持筛选搜索结果，以及按下载状态筛选首页推荐、相似图书、Z-Recommend 和热门榜单。你也可以选择一次打开当前显示的多本书的详情页。

它不会替你下载图书，也不会修改书单内容。

### 安装

1. 在浏览器中安装 Tampermonkey。
2. 在 Tampermonkey 中新建用户脚本，打开 [booklist-enhancer.user.js](./booklist-enhancer.user.js)，复制**全部内容**并粘贴到新脚本中，保存。
3. 打开或刷新下表中的 Z-Library 页面。若之前安装过旧版，请替换旧脚本，并停用重复的副本。

脚本目前不会自动更新。以后更新时，请重新复制脚本的全部内容并保存；已有的显示和筛选偏好会保留。

脚本内置支持以下站点的 HTTPS 页面：`z-lib.sk`、`z-library.sk`、`1lib.sk`、`libb.la`、`z-library.im`、`z-lib.fm`。进入下表中的列表后会出现工具面板。在其他页面，你可能会看到一次可关闭的提示，带你前往书单入口。

| 页面 | 可用筛选 | 其他功能 |
| --- | --- | --- |
| 书单 `/booklist/…` | 格式、大小、下载状态、年份 | 信息显示、Show more 自动化、批量打开书页 |
| 搜索结果 `/s/` | 格式、大小、下载状态、年份 | 批量打开书页 |
| 首页推荐 `/`、图书详情页的相似推荐、Z-Recommend、热门榜单 `/popular` | 下载状态 | 批量打开书页 |

所有页面复用同一个操作面板。当前页面缺少的数据对应的筛选项仍会显示，但不可选择，并注明「站点未提供该信息」；「信息显示」仅书单可展开。搜索结果翻页仍使用网站原有方式，脚本不会将下一页追加到当前页。

### 怎么使用？

- **筛选书籍：**在「筛选器」中选择当前页面支持的文件格式、文件大小、下载状态或出版年份。多个已启用条件会同时生效。点击某个筛选器旁的拉杆图标可设置它的具体规则。文件大小筛选默认关闭，可多选小于 1 MB、1–10 MB、10–50 MB、50–100 MB、100 MB 及以上和「未知大小」；未选范围时暂不按大小隐藏书籍。文件格式支持 PDF、EPUB、AZW3、MOBI、「其他全部」和自定义扩展名；年份可设置起止范围，也可选择是否显示缺少年份的书。
- **调整信息显示（仅书单）：**在「信息显示」中显示或隐藏封面上的文件格式、文件大小标签，以及语言和年份；也可以展开过长的书名与作者名。文件大小标签默认关闭，开启后按小于 1 MB、1–10 MB、10–50 MB、50–100 MB、100 MB 及以上显示不同颜色。无法识别大小的书不显示大小标签。
- **查看书单进度（仅书单）：**「Show more」页码估算和列表末尾统计卡片各有一个默认开启的开关。启用筛选器时，统计卡片显示已加载数量、筛选后数量和书单总数。页码按每 20 本估算；文案中的「已点次数」由已加载书籍数推算，不是实际按钮点击记录。
- **连点 Show more（仅书单）：**「自动化（beta）」有两个定次连点器，默认分别点击 5 次和 10 次。点击标题旁的拉杆图标可在自动化设置中分别设为 1–50 次；只接受半角数字整数。输入不合法时会在输入框旁显示红字，本次按钮文案和运行次数使用该连点器的默认值（5 或 10），无效值不会保存。运行中按钮显示已点次数、剩余次数，点击「停止连点」可中止。工具会等待每轮新增书籍；长时间没有进展时会停止。
- **显示整份书单（仅书单）：**第三个按钮「持续连点 Show more，直到书单显示完毕」默认可点击，但会提示先在自动化设置中启用本站持续连点。启用后，每次执行前确认一次。只有原站 Show more 消失才判定书单显示完毕，不受本工具筛选器隐藏条目的影响；与页面标出的总数相差超过 10 本，或无法读取总数时，会同时显示数量提示。按钮仍可用时，即使数量接近总数也会继续点击。可随时手动停止。
- **一次打开多本书的详情页：**先点击「打开当前显示的所有图书页面」查看说明，再在自动化设置中手动启用该站点的批量打开功能。执行前仍需确认两次。它只会尝试打开当前已加载、经过筛选且实际可见的书页。一次可能打开很多标签页，导致浏览器变慢或触发站点限流；建议先用少量书籍试验。

面板可通过点击标题栏收起或展开，也可以拖动到屏幕边缘。「筛选器」「信息显示」「自动化」三个栏目也可分别收起；初始只展开筛选器。标题栏的齿轮用于界面语言等全局设置；筛选器和自动化标题旁的拉杆图标分别打开对应配置。书单总数若显示为 `1K`，本工具仅在 Show more 页数估算中按 999 本计算；统计卡片保留网站显示的 `1K`。界面默认跟随浏览器或系统语言，支持英语、简体中文、繁体中文、法语、德语、俄语、日语、韩语、西班牙语和巴西葡萄牙语。

### 目前没有什么功能？

- 工具只处理**当前已加载**的书。筛选不会自动加载整份书单或跨页合并搜索结果；进度数字也不是访问历史或下次可恢复的阅读断点。
- 书单与搜索结果的下载状态需要等待站点提供数据；状态未确认时筛选器会暂停。封面推荐列表直接使用网站显示的下载标记；封面尚未就绪时先保持可见，不把未知状态当成「未下载」。
- 「批量加入收藏」仍在开发中，目前不能使用。
- 如果真实站点的「Show more」卡住，工具目前不能安全地重置它；请刷新页面。
- 批量打开没有数量上限，也不能批量撤回、自动重试或记录哪些书页已经打开。提交打开请求不代表书页已成功加载；同页再次执行可能重复打开。

当前版本为 `4.0.1`。脚本已经过本地测试，但尚未完成 Chrome、Firefox、Edge 搭配 Tampermonkey 在真实站点的逐项验收。

### 技术细节

这是一个无需构建的单文件用户脚本，使用 Tampermonkey 保存显示、筛选、连点次数、语言与面板位置偏好；启动提示、持续连点和批量打开许可按域名保存。它不保存书籍链接、下载记录映射、阅读断点或批量打开历史。

如需在其他镜像使用，请先自行核实镜像可信性，再在 Tampermonkey 的本脚本设置中添加精确的 [User matches](https://www.tampermonkey.net/faq.php?q=Q103)，例如 `https://your-mirror.example/booklist/*`（替换为实际域名）。未知镜像只有在 `/booklist/…` 路径且页面结构符合书单特征时才会启动工具；页面结构匹配不能证明镜像安全。

开发与验证记录不随此公开仓库发布。

## English

### What is this?

Z-lib Booklist Enhancer focuses on booklists: it filters books, makes their details easier to read, tracks loading progress, and can click “Show more” in sequence. Version 4.0 also filters search results and filters home recommendations, similar books, Z-Recommend, and popular books by download status. You can choose to open multiple visible book detail pages at once.

It does not download books for you or change the contents of a booklist.

### Install

1. Install Tampermonkey in your browser.
2. Create a new userscript in Tampermonkey. Open [booklist-enhancer.user.js](./booklist-enhancer.user.js), copy its **entire contents**, paste them into the new script, and save.
3. Open or refresh one of the Z-Library pages below. If you installed an older version, replace it and disable any duplicate copy.

The script does not update automatically. For later updates, copy and save the entire script again. Your existing display and filter preferences will be kept.

Built-in HTTPS site support covers `z-lib.sk`, `z-library.sk`, `1lib.sk`, `libb.la`, `z-library.im`, and `z-lib.fm`. The panel appears on these lists. On other pages, you may see a dismissible notice pointing you to the booklist area.

| Page | Available filters | Other tools |
| --- | --- | --- |
| Booklist `/booklist/…` | Format, size, download status, year | Display options, Show more automation, bulk opening |
| Search results `/s/` | Format, size, download status, year | Bulk opening |
| Home recommendations `/`, similar books on a book detail page, Z-Recommend, popular list `/popular` | Download status | Bulk opening |

The same panel is used on every page. Filters for data unavailable on the current page stay visible but disabled, with a “Site does not provide this information” note. Display options expand only on booklists. Search pagination remains the site's own; this script does not append another results page.

### How do I use it?

- **Filter books:** Under “Filters,” choose the file format, file size, download status, or publication year supported by the current page. Enabled filters work together. Use the slider icon beside a filter to set its rule. The size filter is off by default; select any of the five size ranges or unknown size. With no range selected, it hides no books. Format choices include PDF, EPUB, AZW3, MOBI, all other formats, and custom extensions. You can set a year range and choose whether to include books without a year.
- **Change what you see (booklists only):** Under “Display options,” show or hide cover badges for file format and size, language, and year, or expand long titles and author names. The size badge is off by default. When enabled, its color reflects the size bands below 1 MB, 1–10 MB, 10–50 MB, 50–100 MB, and 100 MB or more. Books without a readable size have no size badge.
- **Track booklist progress (booklists only):** The “Show more” page estimate and the summary card each have an on-by-default switch under “Display options.” The summary card appears at the end of the list while a filter is enabled and shows loaded books, books remaining after this tool's filters, and the booklist total. The “Show more” estimate uses 20 books per page; its displayed click count is inferred from loaded books rather than a record of button presses.
- **Click Show more a set number of times (booklists only):** “Automation (beta)” has two clickers, set to 5 and 10 clicks by default. Use the slider icon beside the heading to set each to 1–50 clicks. Only ASCII digit integers are accepted. Invalid input shows a red error beside the field, and that clicker displays and uses its default of 5 or 10; invalid input is not saved. While running, its button shows clicks made and remaining. Click “Stop clicking” to cancel. The tool waits for new books after each click and stops if progress stalls.
- **Display the whole booklist (booklists only):** The third button, “Keep clicking Show more until the whole booklist is displayed,” can be clicked by default and guides you to enable continuous clicking for this site in Automation settings. Once enabled, each run requires one confirmation. The booklist is considered fully displayed only when the site's Show more button disappears, regardless of books hidden by this script's filters. A notice appears if the displayed count differs from the page's stated total by more than 10, or if the total cannot be read. The clicker continues while Show more remains available, even if the counts are close. You can stop it at any time.
- **Open several book detail pages:** Click “Open all currently visible book pages” for an explanation, then enable bulk opening for that site in Automation settings. You must still confirm twice before it runs. It only attempts to open book pages that are currently loaded, pass your filters, and are actually visible. Opening many tabs at once may slow your browser or trigger site rate limits; try a small set first.

Click the panel title bar to collapse or expand it, or drag the panel toward a screen edge. Filters, Display options, and Automation can also be collapsed independently; only Filters starts expanded. The title-bar gear opens global settings such as interface language; the slider icons beside filters and Automation open their respective settings. If a booklist total is shown as `1K`, the tool uses 999 only to estimate Show more page progress; the summary card keeps the site's `1K` label. The interface follows your browser or system language by default and supports English, Simplified Chinese, Traditional Chinese, French, German, Russian, Japanese, Korean, Spanish, and Brazilian Portuguese.

### What does it not do yet?

- The tool works with **books already loaded** on the page. Filtering does not load the whole booklist or append later search pages. Progress figures are not browsing history or a reading position you can resume later.
- Download status on booklists and search results depends on site data; filtering pauses until that data is confirmed. Cover recommendation lists use the site's visible download mark directly. Covers that have not finished rendering remain visible, rather than being assumed “not downloaded.”
- “Add to favorites in bulk” is still in development and cannot be used yet.
- If “Show more” gets stuck on a real site, the tool cannot safely reset it yet; refresh the page.
- Bulk opening has no book-count cap, bulk undo, automatic retry, or record of previously opened pages. Submitting an open request does not guarantee a page loaded; running it again on the same page may open duplicates.

The current version is `4.0.1`. It has been tested locally, but feature-by-feature validation on real sites with Tampermonkey in Chrome, Firefox, and Edge is still incomplete.

### Technical details

This is a single-file userscript with no build step. Tampermonkey stores display, filter, click-count, language, and panel-position preferences; welcome-notice, continuous-clicking, and bulk-opening choices are saved per domain. The script does not store book links, download-record mappings, reading positions, or bulk-opening history.

To use another mirror, first assess its trustworthiness, then add a specific [User matches](https://www.tampermonkey.net/faq.php?q=Q103) rule in this script's Tampermonkey settings, such as `https://your-mirror.example/booklist/*` (replace the example domain). On an unknown mirror, the tools start only on a `/booklist/…` path with a matching booklist structure. A matching structure does not establish that a mirror is safe.

Development and validation notes are not published with this repository.
