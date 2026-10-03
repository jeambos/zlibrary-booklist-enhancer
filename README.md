# Z-Library 书单增强

安装 [booklist-enhancer.user.js](./booklist-enhancer.user.js) 后，脚本默认只匹配用户确认的四个 HTTPS 入口的书单路径：官方入口 `z-lib.sk`、`z-library.sk`、`1lib.sk`，以及官方提供的用户镜像 `libb.la`。`z-library.biz` 不再匹配。这四个入口的书单页和登录后功能尚未逐一实测；域名也可能变化。

其他镜像请自行确认其可信性，然后在 Tampermonkey 中打开本脚本的设置，找到 **User matches**，添加该镜像的精确规则，例如 `https://your-mirror.example/booklist/*`，并将示例域名替换为实际域名。保存后刷新镜像书单页。脚本无法自行修改 `@match`，也不会自动扩大匹配范围。请参阅 [Tampermonkey 的 User matches 说明](https://www.tampermonkey.net/faq.php?q=Q103)。不建议为方便而添加 `https://*/booklist/*`：它会让脚本在任何 HTTPS 网站的相同路径上启动。

对用户添加的站点，脚本会先检查书单结构；不符合时不显示界面，也不改页面内容。这个检查只判断页面结构，**不验证域名的真实性或镜像的安全性**。页面加载后最多等待 30 秒供书单结构出现。下载状态筛选在记录未得到可靠确认时会暂停；空下载记录与请求失败目前无法区分。

当前脚本的功能、限制和测试边界见 [现行设计](./DESIGN.md) 与 [现行测试记录](./TEST_PLAN.md)。下一版的待审阅文档为 [v2 设计规格](./docs/superpowers/specs/2026-10-03-booklist-enhancer-v2-design.md) 和 [v2 测试方案](./docs/superpowers/specs/2026-10-03-booklist-enhancer-v2-test-plan.md)；其中的功能尚未写入当前脚本。
