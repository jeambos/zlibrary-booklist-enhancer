# Z-lib Booklist Enhancer

[简体中文](#简体中文) · [English](#english)

## 简体中文

### 这是什么？

Z-lib Booklist Enhancer 是一个用于 Z-Library 书单页面的 Tampermonkey 用户脚本。它让你更容易查看书籍信息、筛选当前书单，并了解已经加载了多少本书。你也可以选择让它连点「Show more」，或一次打开当前显示的多本书的详情页。

它不会替你下载图书，也不会修改书单内容。

### 安装

1. 在浏览器中安装 Tampermonkey。
2. 在 Tampermonkey 中新建用户脚本，打开 [booklist-enhancer.user.js](./booklist-enhancer.user.js)，复制**全部内容**并粘贴到新脚本中，保存。
3. 打开或刷新 Z-Library 书单页面。若之前安装过旧版，请替换旧脚本，并停用重复的副本。

脚本目前不会自动更新。以后更新时，请重新复制脚本的全部内容并保存；已有的显示和筛选偏好会保留。

脚本内置支持以下站点的 HTTPS 页面：`z-lib.sk`、`z-library.sk`、`1lib.sk`、`libb.la`、`z-library.im`、`z-lib.fm`。进入书单后会出现工具面板。在这些站点的其他页面，你可能会看到一次可关闭的提示，带你前往书单入口。

### 怎么使用？

- **筛选书籍：**在「筛选器」中选择文件格式、下载状态或出版年份。多个已启用条件会同时生效。点击某个筛选器旁的拉杆图标可设置它的具体规则。文件格式支持 PDF、EPUB、AZW3、MOBI、「其他全部」和自定义扩展名；年份可设置起止范围，也可选择是否显示缺少年份的书。
- **调整信息显示：**在「信息显示」中显示或隐藏文件格式标签、语言和年份，也可以展开过长的书名与作者名。
- **查看书单进度：**启用筛选器后，书单末尾会显示已加载数量、筛选后数量和书单总数。点击原站的「Show more」加载更多书时，按钮附近还会显示按每 20 本估算的页数进度。
- **连点 Show more：**「自动化（beta）」有两个定次连点器，默认分别点击 5 次和 10 次。点击标题旁的拉杆图标可在自动化设置中分别设为 1–50 次；只接受半角数字整数。输入不合法时会在输入框旁显示红字，本次按钮文案和运行次数使用该连点器的默认值（5 或 10），无效值不会保存。运行中按钮显示已点次数、剩余次数，点击「停止连点」可中止。工具会等待每轮新增书籍；长时间没有进展时会停止。
- **显示整份书单：**第三个按钮「持续连点 Show more，直到书单显示完毕」默认可点击，但会提示先在自动化设置中启用本站持续连点。启用后，每次执行前确认一次。只有原站 Show more 消失才判定书单显示完毕，不受本工具筛选器隐藏条目的影响；与页面标出的总数相差超过 10 本，或无法读取总数时，会同时显示数量提示。按钮仍可用时，即使数量接近总数也会继续点击。可随时手动停止。
- **一次打开多本书的详情页：**先点击「打开当前显示的所有图书页面」查看说明，再在自动化设置中手动启用该站点的批量打开功能。执行前仍需确认两次。它只会尝试打开当前已加载、经过筛选且实际可见的书页。一次可能打开很多标签页，导致浏览器变慢或触发站点限流；建议先用少量书籍试验。

面板可通过点击标题栏收起或展开，也可以拖动到屏幕边缘。标题栏的齿轮用于界面语言等全局设置；筛选器和自动化标题旁的拉杆图标分别打开对应配置。界面默认跟随浏览器或系统语言，支持英语、简体中文、繁体中文、法语、德语、俄语、日语、韩语、西班牙语和巴西葡萄牙语。

### 目前没有什么功能？

- 工具只处理**当前已加载**的书。筛选不会自动加载整份书单；进度数字也不是访问历史或下次可恢复的阅读断点。
- 下载状态需要等待站点提供数据。在状态未确认时，该筛选器会暂停；工具不会把状态未知的书当成「未下载」。其他功能仍可使用。
- 「批量加入收藏」仍在开发中，目前不能使用。
- 如果真实站点的「Show more」卡住，工具目前不能安全地重置它；请刷新页面。
- 批量打开没有数量上限，也不能批量撤回、自动重试或记录哪些书页已经打开。提交打开请求不代表书页已成功加载；同页再次执行可能重复打开。

当前版本为 `3.2.1`。脚本已经过本地测试，但尚未完成 Chrome、Firefox、Edge 搭配 Tampermonkey 在真实站点的逐项验收。

### 技术细节

这是一个无需构建的单文件用户脚本，使用 Tampermonkey 保存显示、筛选、连点次数、语言与面板位置偏好；启动提示、持续连点和批量打开许可按域名保存。它不保存书籍链接、下载记录映射、阅读断点或批量打开历史。

如需在其他镜像使用，请先自行核实镜像可信性，再在 Tampermonkey 的本脚本设置中添加精确的 [User matches](https://www.tampermonkey.net/faq.php?q=Q103)，例如 `https://your-mirror.example/booklist/*`（替换为实际域名）。未知镜像只有在 `/booklist/…` 路径且页面结构符合书单特征时才会启动工具；页面结构匹配不能证明镜像安全。

开发与验证记录不随此公开仓库发布。

## English

### What is this?

Z-lib Booklist Enhancer is a Tampermonkey userscript for Z-Library booklist pages. It makes book details easier to read, lets you filter the current list, and shows how many books have loaded. You can also choose to click “Show more” in sequence or open multiple visible book detail pages at once.

It does not download books for you or change the contents of a booklist.

### Install

1. Install Tampermonkey in your browser.
2. Create a new userscript in Tampermonkey. Open [booklist-enhancer.user.js](./booklist-enhancer.user.js), copy its **entire contents**, paste them into the new script, and save.
3. Open or refresh a Z-Library booklist page. If you installed an older version, replace it and disable any duplicate copy.

The script does not update automatically. For later updates, copy and save the entire script again. Your existing display and filter preferences will be kept.

Built-in HTTPS site support covers `z-lib.sk`, `z-library.sk`, `1lib.sk`, `libb.la`, `z-library.im`, and `z-lib.fm`. The tools appear when you open a booklist. On other pages of these sites, you may see a dismissible notice pointing you to the booklist area.

### How do I use it?

- **Filter books:** Under “Filters,” choose file format, download status, or publication year. Enabled filters work together. Use the slider icon beside a filter to set its rule. Format choices include PDF, EPUB, AZW3, MOBI, all other formats, and custom extensions. You can set a year range and choose whether to include books without a year.
- **Change what you see:** Under “Information display,” show or hide format badges, language, and year, or expand long titles and author names.
- **Track booklist progress:** Once a filter is enabled, cards at the end of the list show the number of loaded books, the number remaining after filtering, and the booklist total. After you use the site's “Show more” button, you will also see estimated page progress based on 20 books per page.
- **Click Show more a set number of times:** “Automation (beta)” has two clickers, set to 5 and 10 clicks by default. Use the slider icon beside the heading to set each to 1–50 clicks. Only ASCII digit integers are accepted. Invalid input shows a red error beside the field, and that clicker displays and uses its default of 5 or 10; invalid input is not saved. While running, its button shows clicks made and remaining. Click “Stop clicking” to cancel. The tool waits for new books after each click and stops if progress stalls.
- **Display the whole booklist:** The third button, “Keep clicking Show more until the whole booklist is displayed,” can be clicked by default and guides you to enable continuous clicking for this site in Automation settings. Once enabled, each run requires one confirmation. The booklist is considered fully displayed only when the site's Show more button disappears, regardless of books hidden by this script's filters. A notice appears if the displayed count differs from the page's stated total by more than 10, or if the total cannot be read. The clicker continues while Show more remains available, even if the counts are close. You can stop it at any time.
- **Open several book detail pages:** Click “Open pages for all currently visible books” for an explanation, then enable bulk opening for that site in Automation settings. You must still confirm twice before it runs. It only attempts to open book pages that are currently loaded, pass your filters, and are actually visible. Opening many tabs at once may slow your browser or trigger site rate limits; try a small set first.

Click the panel title bar to collapse or expand it, or drag the panel toward a screen edge. The title-bar gear opens global settings such as interface language; the slider icons beside filters and Automation open their respective settings. The interface follows your browser or system language by default and supports English, Simplified Chinese, Traditional Chinese, French, German, Russian, Japanese, Korean, Spanish, and Brazilian Portuguese.

### What does it not do yet?

- The tool works with **books already loaded** on the page. Filtering does not load the whole booklist. Progress figures are not browsing history or a reading position you can resume later.
- Download status depends on data from the site. The download-status filter pauses while that data is unconfirmed; books with unknown status are never assumed to be “not downloaded.” Other features remain available.
- “Add to favorites in bulk” is still in development and cannot be used yet.
- If “Show more” gets stuck on a real site, the tool cannot safely reset it yet; refresh the page.
- Bulk opening has no book-count cap, bulk undo, automatic retry, or record of previously opened pages. Submitting an open request does not guarantee a page loaded; running it again on the same page may open duplicates.

The current version is `3.2.1`. It has been tested locally, but feature-by-feature validation on real sites with Tampermonkey in Chrome, Firefox, and Edge is still incomplete.

### Technical details

This is a single-file userscript with no build step. Tampermonkey stores display, filter, click-count, language, and panel-position preferences; welcome-notice, continuous-clicking, and bulk-opening choices are saved per domain. The script does not store book links, download-record mappings, reading positions, or bulk-opening history.

To use another mirror, first assess its trustworthiness, then add a specific [User matches](https://www.tampermonkey.net/faq.php?q=Q103) rule in this script's Tampermonkey settings, such as `https://your-mirror.example/booklist/*` (replace the example domain). On an unknown mirror, the tools start only on a `/booklist/…` path with a matching booklist structure. A matching structure does not establish that a mirror is safe.

Development and validation notes are not published with this repository.
