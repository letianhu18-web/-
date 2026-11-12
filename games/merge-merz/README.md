# 合成大默茨 · MERZVERSE

[在线游玩](https://letianhu18-web.github.io/-/merge-merz/)

基于同仓库 `suika-the-politician` 的独立 Friedrich Merz 版本。
11 个等级，手机拖动投放；支持暂停、一步撤销、下一颗预览、重开确认。
每个等级有数字与颜色标记，方便区分同一个人的不同表情。
投放前显示落点预览；超过警戒线的球带红色倒计时圈；合成时弹出得分。
随机生成 1–5 级；球的贴图预先渲染，手机上更流畅。
内置梗图图鉴显示完整画面并链接素材来源，点击图片可放大。

## 素材来源

收录 X / Twitter 梗图、经典梗模板和一张 X 视频封面。媒体资源已本地化为 WebP，游戏运行不需要登录 X。
梗名、合成顺序与升级提示是此游戏的娱乐创作，不是 Merz 的真实引语。

| 等级 | 游戏名称 | 素材类型 | 来源 |
|---|---|---|---|
| 1 | 青春默茨 / Analog-Merz | 视频梗素材 | [@_FriedrichMerz](https://x.com/_FriedrichMerz/status/1440742692330164227) |
| 2 | 啤酒垫默茨 / Bierdeckel-Steuer | 2005 年竞选啤酒垫照片 | [Westfalenpost](https://www.wp.de/lokales/arnsberg/article408290675/kanzlerkandidat-friedrich-merz-bilder-aus-seinem-politischen-leben.html) |
| 3 | 咖喱默茨 / Currywurst | 经典梗素材 | [@_FriedrichMerz](https://x.com/_FriedrichMerz/status/1603368811213856768) |
| 4 | 番茄酱默茨 / Ketchup-Merz | X 梗图的媒体拼图 | [@RalfHeinrich58](https://x.com/RalfHeinrich58/status/1603671439990824962) |
| 5 | 鸡蛋脸默茨 / Ei-Merz | 网站截图梗图 | [watson](https://www.watson.ch/international/deutschland/150187867-schluepfrige-domain-fuehrt-zu-friedrich-merz-webseite) |
| 6 | 鸡蛋默茨 / Merz, leck Eier! | X 梗图 | [@LINKEPELLI](https://x.com/LINKEPELLI/status/2041050889188770234) |
| 7 | 伯恩斯默茨 / Mr. Burns | 经典撞脸梗图 | [debeste.de](https://debeste.de/320067/) |
| 8 | 省房租默茨 / Doppel-Schicht | X 梗图 | [@eM_aka_zero](https://x.com/eM_aka_zero/status/1644987554310270978) |
| 9 | 重数默茨 / Nochmal zählen | X 梗图 | [@meme_ec](https://x.com/meme_ec/status/1919666911341678830) |
| 10 | 狂欢默茨 / Rambo Zambo | 2025 胜选梗图 | [debeste.de](https://debeste.de/490377/Guten-Morgen-Rambo-Zambo-Land) |
| 11 | 起飞默茨 / CDU Air | X 梗图素材 | [@schote_erzaehl](https://x.com/schote_erzaehl/status/1545671359614926849) |
第 5 级为 watson 对“默茨脸鸡蛋”网站的截图，来源：
https://www.watson.ch/international/deutschland/150187867-schluepfrige-domain-fuehrt-zu-friedrich-merz-webseite

第 4 级使用 BuzzFeed 对 Ralf Heinrich 推文的媒体拼图，来源：
https://www.buzzfeed.de/news/liste-friedrich-merz-currywurst-twitter-reaktionen-tweets-91979974.html
该旧推文的直接媒体接口本次没有返回图片，因此保留媒体拼图并明确标注。
第 2、7、10 级（啤酒垫、Mr. Burns、Rambo Zambo）的图片分别取自 Westfalenpost 与 debeste.de 的公开页面。完整 URL、裁剪设置见 `assets/sources.json`。

原图的版权属于相应权利人；此项目保留出处，没有重新声明上游图片的许可证。
原代码来源与上次优化记录见同仓库 `suika-the-politician/README.md`。

## 本地运行

在本目录运行 `python3 -m http.server 8080`，然后打开 http://localhost:8080/。
运行测试：`npm test`。前端无需安装依赖或构建。

照片自定义仅本地使用；默认没有配置在线上传或分享服务。
棋盘与自定义照片草稿刷新后清空；最高分、静音、语言和已调整的裁剪保存在当前浏览器。
