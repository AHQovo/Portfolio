# 秦婧娟 · 游戏策划作品集网站

这是一个 GitHub Pages 项目站点（Project site），仓库名为 `Portfolio`。发布后访问：

`https://ahqovo.github.io/Portfolio/`

网站内容依据《秦婧娟-游戏策划作品集.docx》整理，全部为静态文件，不需要构建步骤。

## 打开方式

双击 `index.html` 即可在浏览器中查看。网站不依赖服务器、数据库或前端构建工具，所有图片、样式和脚本都在本地文件夹内。

本地仓库路径：`G:\Portfolio`

## 页面结构

- `index.html`：首页，包含个人介绍、作品索引、关于我与联系方式
- `work/ddt.html`：《D.D.T.》案例
- `work/diaodiao.html`：《小喵钓钓乐》案例
- `work/dormiveglia.html`：《悬浮之境 DORMIVEGLIA》案例
- `work/tangqiqi.html`：《加油，唐七七！》案例
- `work/alien.html`：《外星人入侵游戏》案例
- `assets/css/site.css`：整站样式、响应式布局与动画
- `assets/js/site.js`：移动端菜单、滚动动效、邮箱复制与图片灯箱
- `assets/img/`：从原始文档提取的证件照与游戏截图

## 部署

本仓库按 GitHub Pages 的 **Project site** 方式部署：

- 仓库：`AHQovo/Portfolio`
- 发布来源：`main` 分支
- 发布目录：`/`（仓库根目录）
- 站点地址：`https://ahqovo.github.io/Portfolio/`

GitHub 仓库的 Pages 设置中，选择 “Deploy from a branch”，分支选择 `main`，目录选择 `/ (root)`。仓库根目录的 `.nojekyll` 会关闭 Jekyll 处理，直接发布静态文件。

日常更新：

```powershell
cd G:\Portfolio
git add .
git commit -m "Update portfolio"
git push
```

推送后 GitHub Pages 通常会在 1–3 分钟内更新。不要删除 `index.html`、`assets/` 或 `work/` 的相对目录结构。

## 修改内容

- 联系方式：编辑 `index.html` 末尾的 `mailto:`、`tel:` 与显示文本
- 个人介绍与技能：编辑 `index.html` 中 `id="about"` 的区域
- 项目内容：编辑 `work/` 下对应的 HTML 文件
- 配色与字体：编辑 `assets/css/site.css` 顶部的 CSS 变量
- 项目链接：搜索 `https://`，替换 `work/` 页面中的外链

## 内容与图片说明

- 证件照与《D.D.T.》《悬浮之境》的游戏画面均来自原始 DOCX。
- 《小喵钓钓乐》《加油，唐七七！》《外星人入侵游戏》没有公开截图，页面使用依据文档内容重绘的策划拆解图，并在页面与图片说明中标注“非游戏截图”。
- 页面文字保留了原文档中的项目事实与数据，没有添加虚构的销量、留存率或团队规模。
- GmHub 在原文档中只有平台首页链接，因此页面标注为“GmHub 平台首页”，没有伪造项目详情页地址。

## 适配与检查

已在 Chrome 中检查 1440px、1024px、768px、390px 与 320px 宽度；页面无横向溢出，图片可加载，移动端菜单、邮箱复制、图片灯箱与键盘关闭均可用。

字体优先使用本机的 Noto Serif SC / Noto Sans SC，并提供宋体、苹方、微软雅黑等系统回退，不依赖外部字体 CDN。

## GitHub Pages 项目站点说明

Project site 与 `用户名.github.io` 用户站点相互独立。当前站点的所有内部路径都使用相对路径，因此部署在 `/Portfolio/` 子路径下也能正确加载图片、样式和案例页。

如果以后要绑定自定义域名，再在仓库 Pages 设置中添加自定义域名，不需要改变现有文件结构。
