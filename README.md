# Z-lib Booklist Enhancer

[简体中文](#简体中文) · [English](#english)

## 简体中文

### 这是什么？

Z-lib Booklist Enhancer 是一个用于 Z-Library 书单页面的 Tampermonkey 用户脚本。它让你更容易查看书籍信息、筛选当前书单，并了解已经加载了多少本书。你也可以选择让它依次点击「Show more」，或一次打开当前显示的多本书的详情页。

它不会替你下载图书，也不会修改书单内容。

### 安装

1. 在浏览器中安装 Tampermonkey。
2. 在 Tampermonkey 中新建用户脚本，打开 [booklist-enhancer.user.js](./booklist-enhancer.user.js)，复制**全部内容**并粘贴到新脚本中，保存。
3. 打开或刷新 Z-Library 书单页面。若之前安装过旧版，请替换旧脚本，并停用重复的副本。

脚本目前不会自动更新。以后更新时，请重新复制脚本的全部内容并保存；已有的显示和筛选偏好会保留。

脚本内置支持以下站点的 HTTPS 页面：`z-lib.sk`、`z-library.sk`、`1lib.sk`、`libb.la`、`z-library.im`、`z-lib.fm`。进入书单后会出现工具面板。在这些站点的其他页面，你可能会看到一次可关闭的提示，带你前往书单入口。

### 怎么使用？

- **筛选书籍：**在「筛选器」中选择文件格式、下载状态或出版年份。多个已启用条件会同时生效。点击某个筛选器旁的齿轮可设置它的具体规则。文件格式支持 PDF、EPUB、AZW3、MOBI、「其他全部」和自定义扩展名；年份可设置起止范围，也可选择是否显示缺少年份的书。
- **调整信息显示：**在「信息显示」中显示或隐藏文件格式标签、语言和年份，也可以展开过长的书名与作者名。
- **查看书单进度：**启用筛选器后，书单末尾会显示已加载数量、筛选后数量和书单总数。点击原站的「Show more」加载更多书时，按钮附近还会显示按每 20 本估算的页数进度。
- **连续加载更多书：**在「自动化（beta）」中点击「依次点击 Show more，最多 5 次」。工具会等待新书加载后再点击下一次；如果长时间没有进展，会停止。按钮上会显示本页由工具发起的累计尝试次数和失败次数。
- **一次打开多本书的详情页：**先点击「打开当前显示的所有图书页面」查看说明，再到面板标题栏扳手图标中的全局设置，手动启用该站点的批量打开功能。执行前还需确认两次。它只会尝试打开当前已加载、经过筛选且实际可见的书页。一次可能打开很多标签页，导致浏览器变慢或触发站点限流；建议先用少量书籍试验。

面板可通过点击标题栏收起或展开，也可以拖动到屏幕边缘。标题栏的扳手图标用于界面语言等全局设置；筛选器旁的齿轮只设置对应筛选条件。界面默认跟随浏览器或系统语言，支持英语、简体中文、繁体中文、法语、德语、俄语、日语、韩语、西班牙语和巴西葡萄牙语。

### 目前没有什么功能？

- 工具只处理**当前已加载**的书。筛选不会自动加载整份书单；进度数字也不是访问历史或下次可恢复的阅读断点。
- 下载状态需要等待站点提供数据。在状态未确认时，该筛选器会暂停；工具不会把状态未知的书当成「未下载」。其他功能仍可使用。
- 「批量加入收藏」仍在开发中，目前不能使用。
- 如果真实站点的「Show more」卡住，工具目前不能安全地重置它；请刷新页面。
- 批量打开没有数量上限，也不能批量撤回、自动重试或记录哪些书页已经打开。提交打开请求不代表书页已成功加载；同页再次执行可能重复打开。

当前版本为 `3.1.0-dev`。脚本已经过本地测试，但尚未完成 Chrome、Firefox、Edge 搭配 Tampermonkey 在真实站点的逐项验收。

### 技术细节

这是一个无需构建的单文件用户脚本，使用 Tampermonkey 保存显示、筛选、语言与面板位置偏好；启动提示和批量打开许可按域名保存。它不保存书籍链接、下载记录映射、阅读断点或批量打开历史。

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

- **Filter books:** Under “Filters,” choose file format, download status, or publication year. Enabled filters work together. Use the gear beside a filter to set its rule. Format choices include PDF, EPUB, AZW3, MOBI, all other formats, and custom extensions. You can set a year range and choose whether to include books without a year.
- **Change what you see:** Under “Information display,” show or hide format badges, language, and year, or expand long titles and author names.
- **Track booklist progress:** Once a filter is enabled, cards at the end of the list show the number of loaded books, the number remaining after filtering, and the booklist total. After you use the site's “Show more” button, you will also see estimated page progress based on 20 books per page.
- **Load more books automatically:** Under “Automation (beta),” choose “Click Show more up to 5 times.” The tool waits for new books to load before trying the next click and stops if progress stalls. Its button shows how many attempts and failures the tool has recorded on the current page.
- **Open several book detail pages:** Click “Open pages for all currently visible books” for an explanation, then enable bulk opening for that site in the global settings under the title-bar wrench. You must confirm twice before it runs. It only attempts to open book pages that are currently loaded, pass your filters, and are actually visible. Opening many tabs at once may slow your browser or trigger site rate limits; try a small set first.

Click the panel title bar to collapse or expand it, or drag the panel toward a screen edge. The title-bar wrench opens global settings such as interface language; the gears beside filters configure individual rules. The interface follows your browser or system language by default and supports English, Simplified Chinese, Traditional Chinese, French, German, Russian, Japanese, Korean, Spanish, and Brazilian Portuguese.

### What does it not do yet?

- The tool works with **books already loaded** on the page. Filtering does not load the whole booklist. Progress figures are not browsing history or a reading position you can resume later.
- Download status depends on data from the site. The download-status filter pauses while that data is unconfirmed; books with unknown status are never assumed to be “not downloaded.” Other features remain available.
- “Add to favorites in bulk” is still in development and cannot be used yet.
- If “Show more” gets stuck on a real site, the tool cannot safely reset it yet; refresh the page.
- Bulk opening has no book-count cap, bulk undo, automatic retry, or record of previously opened pages. Submitting an open request does not guarantee a page loaded; running it again on the same page may open duplicates.

The current version is `3.1.0-dev`. It has been tested locally, but feature-by-feature validation on real sites with Tampermonkey in Chrome, Firefox, and Edge is still incomplete.

### Technical details

This is a single-file userscript with no build step. Tampermonkey stores display, filter, language, and panel-position preferences; welcome-notice and bulk-opening choices are saved per domain. The script does not store book links, download-record mappings, reading positions, or bulk-opening history.

To use another mirror, first assess its trustworthiness, then add a specific [User matches](https://www.tampermonkey.net/faq.php?q=Q103) rule in this script's Tampermonkey settings, such as `https://your-mirror.example/booklist/*` (replace the example domain). On an unknown mirror, the tools start only on a `/booklist/…` path with a matching booklist structure. A matching structure does not establish that a mirror is safe.

Development and validation notes are not published with this repository.
