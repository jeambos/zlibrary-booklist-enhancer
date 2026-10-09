# Z-lib Booklist Enhancer

[简体中文](#简体中文) · [English](#english) · [更新日志 / Changelog](./changelog.md)

## 简体中文

### 这是什么？

Z-lib Booklist Enhancer 以书单增强为核心：它能筛选书单、改善书籍信息的显示、查看加载进度，并按需连点「Show more」。它也支持筛选搜索结果，按下载状态筛选首页推荐、相似图书、Z-Recommend 和热门榜单，并在这些封面列表中连点「Load more」。你还可以选择一次打开当前显示的多本书的详情页。

它不会替你下载图书，也不会修改书单内容。

### 安装

1. 在浏览器中安装 Tampermonkey。
2. 在 Tampermonkey 中新建用户脚本，打开 [booklist-enhancer.user.js](./booklist-enhancer.user.js)，复制**全部内容**并粘贴到新脚本中，保存。
3. 打开或刷新下表中的 Z-Library 页面。若之前安装过旧版，请替换旧脚本，并停用重复的副本。

脚本每天首次加载时会查询 Greasy Fork 的已发布版本；如有新版，面板标题下方会以红字提示并提供更新链接。查询失败时会稍后重试。脚本不会自动更新；以后更新时，请重新复制脚本的全部内容并保存，已有的显示和筛选偏好会保留。

脚本内置支持以下站点的 HTTPS 页面：`z-lib.sk`、`z-library.sk`、`1lib.sk`、`libb.la`、`z-library.im`、`z-lib.fm`。进入下表中的列表后会出现工具面板。在其他页面，你可能会看到一次可关闭的提示，带你前往书单入口。

| 页面 | 可用筛选 | 其他功能 |
| --- | --- | --- |
| 书单 `/booklist/…` | 格式、大小、下载状态、年份 | 信息显示、Show more 自动化、批量打开书页 |
| 搜索结果 `/s/` | 格式、大小、下载状态、年份 | 批量打开书页 |
| 首页推荐 `/`、图书详情页的相似推荐、Z-Recommend、热门榜单 `/popular` | 下载状态 | 统计卡片、显示书名和作者名、Load more 自动化、批量打开书页；首页、详情推荐和热门榜单可选择不裁剪最后一行；详情页还可展开相关书单 |

所有页面复用同一个操作面板。当前页面缺少的数据对应的筛选项仍会显示，但不可选择，并注明「站点未提供该信息」。「信息显示」可在书单和四处封面列表展开；每处只启用适用的选项，搜索结果仍不可展开。搜索结果翻页仍使用网站原有方式，脚本不会将下一页追加到当前页。

### 怎么使用？

- **筛选书籍：**在「筛选器」中选择当前页面支持的文件格式、文件大小、下载状态或出版年份。多个已启用条件会同时生效。点击某个筛选器旁的拉杆图标可设置它的具体规则。文件大小筛选默认关闭，可多选小于 1 MB、1–10 MB、10–50 MB、50–100 MB、100 MB 及以上和「未知大小」；未选范围时暂不按大小隐藏书籍。文件格式支持 PDF、EPUB、AZW3、MOBI、「其他全部」和自定义扩展名；年份可设置起止范围，也可选择是否显示缺少年份的书。
- **调整信息显示（仅书单）：**在「信息显示」中显示或隐藏封面上的文件格式、文件大小标签，以及语言和年份；也可以展开过长的书名与作者名。文件大小标签默认关闭，开启后按小于 1 MB、1–10 MB、10–50 MB、50–100 MB、100 MB 及以上显示不同颜色。无法识别大小的书不显示大小标签。
- **显示封面书名与作者：**在首页推荐、详情页相似推荐、Z-Recommend 结果和热门榜单中，可分别开启「显示书名」与「显示作者名」。两项默认关闭，只使用封面组件已有的文字；缺少对应信息的书不会显示空白占位。
- **不裁剪列表最后一行：**首页推荐、详情页相似推荐和热门榜单的「信息显示」中可开启此项，默认关闭。开启后取消站点瀑布流容器的负下边距，让最后一行完整显示；关闭后恢复网站原有布局。Z-Recommend 使用另一种列表结构，此开关不可用。
- **展开相关书单：**图书详情页的「Related Booklists」标题前有三角按钮，可将横向列表展开为网格，再点一次恢复原样。这个按钮只影响当前书页，刷新或离开后恢复默认布局。「信息显示」中的「相关书单默认以网格显示」会保存为所有书页的默认设置，默认关闭；改动该设置时，当前书页的临时选择会清除。
- **查看筛选统计：**书单和上述四处封面列表都有默认开启的「列表末尾统计卡片」开关；启用筛选器时，卡片显示当前已加载数量和本工具筛选后数量。书单还会显示站点给出的总数。仅书单提供「Show more」页码估算；它按每 20 本估算，文案中的「已点次数」由已加载书籍数推算，不是实际按钮点击记录。
- **连点 Show more / Load more：**书单使用 Show more；首页推荐、详情页相似推荐、Z-Recommend 结果和热门榜单在列表末尾有链接时使用 Load more。「自动化（beta）」有两个定次连点器，默认分别点击 5 次和 10 次。点击标题旁的拉杆图标可在自动化设置中分别设为 1–50 次；只接受半角数字整数。输入不合法时会在输入框旁显示红字，本次按钮文案和运行次数使用该连点器的默认值（5 或 10），无效值不会保存。运行中按钮显示已点次数、剩余次数，点击「停止连点」可中止。本轮链接恢复可用时继续点击；链接消失则停止。若连续 10 秒未完成本轮加载，也会停止。每轮不要求固定新增 20 本。
- **显示整份列表：**第三个按钮在书单上显示「持续连点 Show more，直到书单显示完毕」，在封面列表上显示相应的 Load more 文案。默认可点击，但会提示先在自动化设置中启用本站持续连点；启用后，每次执行前确认一次。只有原站加载链接消失才判定列表显示完毕，不受本工具筛选器隐藏条目的影响。仅书单会核对页面标出的总数：相差超过 10 本或无法读取总数时，会显示数量提示。链接仍可用时，即使数量接近总数也会继续点击。可随时手动停止。
- **一次打开多本书的详情页：**先点击「打开当前显示的所有图书页面」查看说明，再在自动化设置中手动启用该站点的批量打开功能。执行前仍需确认两次。它只会尝试打开当前已加载、经过筛选且实际可见的书页。一次可能打开很多标签页，导致浏览器变慢或触发站点限流；建议先用少量书籍试验。执行时按钮显示已点次数与剩余次数，再次点击可中止后续打开操作，已打开的标签页不会关闭。自动化设置中还可开启默认关闭的「仅批量打开图书页面时使用拟人化间隔」：打开间隔随机取 500–5000 毫秒，其中约 80% 落在 1000–2500 毫秒；此设置不影响 Show more / Load more 连点器。批量打开运行中会在按钮下方提示，并可从自动化设置中关闭。两个确认弹窗以及其他弹窗均有开关动画。

面板可通过点击标题栏收起或展开，也可以拖动到屏幕边缘。「筛选器」「信息显示」「自动化」三个栏目也可分别收起；初始只展开筛选器。标题栏的齿轮用于界面语言等全局设置；筛选器和自动化标题旁的拉杆图标分别打开对应配置。书单总数若显示为 `1K`，本工具仅在 Show more 页数估算中按 999 本计算；统计卡片保留网站显示的 `1K`。界面默认跟随浏览器或系统语言，支持英语、简体中文、繁体中文、法语、德语、俄语、日语、韩语、西班牙语和巴西葡萄牙语。全局设置中的「关于」提供 Greasy Fork 插件主页与 GitHub 链接；「分享给朋友」默认一键复制第一人称推荐文案、脚本名称和安装地址；勾选「只复制安装地址」后，仅复制 Greasy Fork URL。复制后不会弹出对话框。「在其他Z-lib镜像站使用本工具」会打开添加 User matches 的说明。

### 与 UI Enhance 脚本并用

如果本工具在书单或搜索页观察到 [Z-Library UI Enhance](https://greasyfork.org/scripts/497146-z-library-ui-enhance) 正在运行，面板标题下会出现兼容性提示；首页和 Z-Recommend 显示条件提示，不表示检测到用户安装了该脚本。点击「了解详情」可一次查看所有已知风险。提示可在当前标签页会话内关闭，之后仍能从全局设置的「兼容性说明」打开同一详情。

UI Enhance 的语言筛选或推荐过滤可能直接移除图书，本工具只能统计和筛选**当前页面仍存在的条目**；书单语言选择清空后，已移除的卡片可能需要刷新页面才能恢复。搜索页启用相同 ISBN 折叠时，本工具仍可能筛选被隐藏的版本。UI Enhance 的复制书单与批量下载通过站点接口读取书单，不遵循本工具的页面筛选；其按钮旁的「⚠脚本冲突提示」也会打开同一说明。下载状态变更后，本工具的筛选与统计可能未立即刷新；如有不符，请刷新页面核对。提示依据仓库内 UI Enhance 2026.9.7 代码，真实页面的并装行为仍待验证。

### 目前没有什么功能？

- 筛选只处理**当前已加载**的书，不会自行加载整份列表或跨页合并搜索结果；自动化连点需要手动启动。进度数字不是访问历史或下次可恢复的阅读断点。
- 书单与搜索结果的下载状态需要等待站点提供数据；状态未确认时筛选器会暂停。封面推荐列表直接使用网站显示的下载标记；封面尚未就绪时先保持可见，不把未知状态当成「未下载」。
- 「批量加入收藏」仍在开发中，目前不能使用。
- 如果网站的 Show more 或 Load more 卡在加载状态，连点器会停止；请刷新页面后再试。网站可能已经推进内部页码，单纯恢复链接外观无法保证重试失败的那一页，因此不提供按钮重置。
- 批量打开没有数量上限，也不能批量撤回、自动重试或记录哪些书页已经打开。提交打开请求不代表书页已成功加载；同页再次执行可能重复打开。

当前版本为 `4.3.1`。脚本已经过本地测试，但尚未完成 Chrome、Firefox、Edge 搭配 Tampermonkey 在真实站点的逐项验收。

### 技术细节

这是一个无需构建的单文件用户脚本，使用 Tampermonkey 保存显示、筛选、连点次数、语言与面板位置偏好；启动提示、持续连点和批量打开许可按域名保存。它不保存书籍链接、下载记录映射、阅读断点或批量打开历史。每天的版本检查日期与结果保存在 Tampermonkey 的共享脚本存储中，可供同一浏览器配置下的标签页共用；午夜后首次加载会重新查询。

全局设置中的镜像按钮会弹出以下说明：如需在其他镜像使用，请先自行核实镜像可信性，再在 Tampermonkey 的本脚本设置中添加精确的 [User matches](https://www.tampermonkey.net/faq.php?q=Q103)，例如 `https://your-mirror.example/booklist/*`（替换为实际域名）。未知镜像只有在 `/booklist/…` 路径且页面结构符合书单特征时才会启动工具；页面结构匹配不能证明镜像安全。

开发与验证记录不随此公开仓库发布。

## English

### What is this?

Z-lib Booklist Enhancer focuses on booklists: it filters books, makes their details easier to read, tracks loading progress, and can click “Show more” in sequence. It also filters search results and filters home recommendations, similar books, Z-Recommend, and popular books by download status, with “Load more” automation on those cover lists. You can choose to open multiple visible book detail pages at once.

It does not download books for you or change the contents of a booklist.

### Install

1. Install Tampermonkey in your browser.
2. Create a new userscript in Tampermonkey. Open [booklist-enhancer.user.js](./booklist-enhancer.user.js), copy its **entire contents**, paste them into the new script, and save.
3. Open or refresh one of the Z-Library pages below. If you installed an older version, replace it and disable any duplicate copy.

On its first load each day, the script checks the published version on Greasy Fork. If a newer version is available, a red notice and update link appear beneath the panel title. A failed check is retried later. The script does not update automatically; copy and save the entire script again to update. Your existing display and filter preferences will be kept.

Built-in HTTPS site support covers `z-lib.sk`, `z-library.sk`, `1lib.sk`, `libb.la`, `z-library.im`, and `z-lib.fm`. The panel appears on these lists. On other pages, you may see a dismissible notice pointing you to the booklist area.

| Page | Available filters | Other tools |
| --- | --- | --- |
| Booklist `/booklist/…` | Format, size, download status, year | Display options, Show more automation, bulk opening |
| Search results `/s/` | Format, size, download status, year | Bulk opening |
| Home recommendations `/`, similar books on a book detail page, Z-Recommend, popular list `/popular` | Download status | Summary card, title and author display, Load more automation, bulk opening; the three `z-masonry` page types can also show the full last row; book details can expand related booklists |

The same panel is used on every page. Filters for data unavailable on the current page stay visible but disabled, with a “Site does not provide this information” note. Display options expand on booklists and all four cover lists, with only the applicable controls enabled. They remain unavailable on search results. Search pagination remains the site's own; this script does not append another results page.

### How do I use it?

- **Filter books:** Under “Filters,” choose the file format, file size, download status, or publication year supported by the current page. Enabled filters work together. Use the slider icon beside a filter to set its rule. The size filter is off by default; select any of the five size ranges or unknown size. With no range selected, it hides no books. Format choices include PDF, EPUB, AZW3, MOBI, all other formats, and custom extensions. You can set a year range and choose whether to include books without a year.
- **Change what you see (booklists only):** Under “Display options,” show or hide cover badges for file format and size, language, and year, or expand long titles and author names. The size badge is off by default. When enabled, its color reflects the size bands below 1 MB, 1–10 MB, 10–50 MB, 50–100 MB, and 100 MB or more. Books without a readable size have no size badge.
- **Show cover titles and authors:** On home recommendations, similar books, Z-Recommend results, and popular lists, enable “Show book titles” and “Show author names” independently. Both are off by default and use text already provided by the cover component. Missing fields leave no empty placeholder.
- **Show the full last row:** On home recommendations, similar books, and popular lists, “Don't crop the last row” under Display options removes the site's negative bottom margin from the masonry grid. It is off by default; turning it off restores the site's layout. Z-Recommend uses a different list structure, so the switch is unavailable there.
- **Expand related booklists:** On a book detail page, the triangle before “Related Booklists” expands the horizontal carousel into a grid; click it again to restore the carousel. This choice lasts only on the current book page. “Show Related Booklists as a grid by default” under Display options saves the default for all book pages and starts off. Changing that setting clears the current page's temporary choice.
- **View filter counts:** Booklists and all four cover lists have an on-by-default “Summary card at end of list” switch. While a filter is enabled, the card shows books currently loaded and books remaining after this tool's filters. Booklists also show the site's total. Only booklists have the “Show more” page estimate, which uses 20 books per page; its displayed click count is inferred from loaded books rather than a record of button presses.
- **Click Show more / Load more a set number of times:** Booklists use Show more. Home recommendations, similar books, Z-Recommend results, and popular lists use Load more when that link is present at the end. “Automation (beta)” has two clickers, set to 5 and 10 clicks by default. Use the slider icon beside the heading to set each to 1–50 clicks. Only ASCII digit integers are accepted. Invalid input shows a red error beside the field, and that clicker displays and uses its default of 5 or 10; invalid input is not saved. While running, its button shows clicks made and remaining. Click “Stop clicking” to cancel. The next click follows when the native link becomes available again. A disappearing link or a batch that does not finish after 10 seconds without progress stops the task. No batch is required to contain exactly 20 books.
- **Display the whole list:** The third button says “Keep clicking Show more until the whole booklist is displayed” on booklists and uses Load more wording on cover lists. It can be clicked by default and guides you to enable continuous clicking for this site in Automation settings. Once enabled, each run requires one confirmation. A list is considered fully displayed only when the site's loading link disappears, regardless of books hidden by this script's filters. Only booklists compare the displayed count with the site's total and show a notice if it differs by more than 10 or cannot be read. You can stop the clicker at any time.
- **Open several book detail pages:** Click “Open all currently visible book pages” for an explanation, then enable bulk opening for that site in Automation settings. You must still confirm twice before it runs. It only attempts to open book pages that are currently loaded, pass your filters, and are actually visible. Opening many tabs at once may slow your browser or trigger site rate limits; try a small set first. While it runs, the button shows opened and remaining counts; click it again to stop further openings. Tabs already opened stay open. Automation settings also offer an off-by-default Human-like timing option for bulk opening only: randomized gaps of 500–5000 ms, with about 80% in the 1000–2500 ms range. It does not affect the Show more / Load more clickers. A hint beneath the bulk-opening button appears while it is running and the option is on; you can turn it off in Automation settings. The two confirmation dialogs, like the other dialogs, have opening and closing animations.

Click the panel title bar to collapse or expand it, or drag the panel toward a screen edge. Filters, Display options, and Automation can also be collapsed independently; only Filters starts expanded. The title-bar gear opens global settings such as interface language; the slider icons beside filters and Automation open their respective settings. If a booklist total is shown as `1K`, the tool uses 999 only to estimate Show more page progress; the summary card keeps the site's `1K` label. The interface follows your browser or system language by default and supports English, Simplified Chinese, Traditional Chinese, French, German, Russian, Japanese, Korean, Spanish, and Brazilian Portuguese. Global settings provide Greasy Fork and GitHub links under About. Share with friends copies a first-person recommendation, the script name, and the Greasy Fork URL by default. Check Installation link only to copy just the URL. Copying does not open a dialog. “Use this tool on other Z-lib mirrors” opens instructions for adding User matches.

### Using it with UI Enhance

When this tool observes [Z-Library UI Enhance](https://greasyfork.org/scripts/497146-z-library-ui-enhance) running on a booklist or search page, it shows a compatibility notice beneath the panel title. Home and Z-Recommend show a conditional notice; that notice does not mean another script was detected. “Learn more” opens one explanation of all known risks. You can dismiss the notice for the current tab session and reopen the explanation from “Compatibility information” in global settings.

UI Enhance may remove books through its language or recommendation filters. This tool can count and filter only **books still present on the page**; clearing UI Enhance’s language choice may require a page refresh to restore removed cards. On search pages, this tool may still filter editions hidden by UI Enhance’s same-ISBN grouping. UI Enhance’s copy and batch-download actions read the booklist through site APIs and do not follow this tool’s page filters. The warning links beside those buttons open the same explanation. Download-status changes may not immediately update this tool’s filters or counts; refresh the page if they differ. These notices are based on the repository copy of UI Enhance 2026.9.7; real-site co-installation still needs validation.

### What does it not do yet?

- Filtering works with **books already loaded** on the page; it does not load a whole list by itself or append later search pages. Automated clicking must be started manually. Progress figures are not browsing history or a reading position you can resume later.
- Download status on booklists and search results depends on site data; filtering pauses until that data is confirmed. Cover recommendation lists use the site's visible download mark directly. Covers that have not finished rendering remain visible, rather than being assumed “not downloaded.”
- “Add to favorites in bulk” is still in development and cannot be used yet.
- If the site's Show more or Load more control stays loading, the clicker stops; refresh the page before retrying. The site may already have advanced its internal page number, so changing the control's appearance alone cannot guarantee a retry of the failed page. There is no button reset.
- Bulk opening has no book-count cap, bulk undo, automatic retry, or record of previously opened pages. Submitting an open request does not guarantee a page loaded; running it again on the same page may open duplicates.

The current version is `4.3.1`. It has been tested locally, but feature-by-feature validation on real sites with Tampermonkey in Chrome, Firefox, and Edge is still incomplete.

### Technical details

This is a single-file userscript with no build step. Tampermonkey stores display, filter, click-count, language, and panel-position preferences; welcome-notice, continuous-clicking, and bulk-opening choices are saved per domain. The script does not store book links, download-record mappings, reading positions, or bulk-opening history. The daily version-check date and result use shared Tampermonkey storage, so tabs in the same browser profile can reuse them. The first load after local midnight starts a new check.

The mirror button in global settings shows these instructions: To use another mirror, first assess its trustworthiness, then add a specific [User matches](https://www.tampermonkey.net/faq.php?q=Q103) rule in this script's Tampermonkey settings, such as `https://your-mirror.example/booklist/*` (replace the example domain). On an unknown mirror, the tools start only on a `/booklist/…` path with a matching booklist structure. A matching structure does not establish that a mirror is safe.

Development and validation notes are not published with this repository.
