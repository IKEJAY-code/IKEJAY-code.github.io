# NOCTURNE · In Daylight

黄裕杰（Yujie Huang）的个人研究网站。默认英文，中文位于 `/zh/`；页首按钮在当前页面的两个语言版本之间切换。暖白色、克制的鼠尾草绿、衬线标题与点云动效。静态 Astro 网站，无数据库，无登录后台，无远程字体或分析追踪。

## 启动

需要 Node.js 22.12+ 和 pnpm 11.25.0。

```sh
pnpm install
pnpm dev
```

打开终端显示的本地地址。项目已包含锁文件，后续建议使用 `pnpm install --frozen-lockfile`。

```sh
pnpm check       # Astro / TypeScript 检查
pnpm build       # 静态站点输出到 dist/
pnpm verify      # 构建后检查内部链接、论文版本来源与下载文件
pnpm preview     # 预览构建版本
```

## 内容维护

- `src/lib/i18n.ts`：共用界面翻译、语言路径与简历文件名。
- `src/views/`：两种语言共用的页面视图；`src/pages/` 和 `src/pages/zh/` 是路由入口。
- `src/data/profile.ts`：姓名、邮箱、学校、社交链接。
- `src/data/research.ts`：论文标题、作者、状态、简介、出处、下载链接、BibTeX。
- `src/content/writing/`：Markdown 博客。复制 `_template.md` 并改为不以下划线开头的文件名，补全标题、摘要、日期、标签；使用 `lang: en` 或 `lang: zh`，两种语言使用同一 `translationKey` 来配对；设置 `draft: false` 后参与构建。草稿、未来日期、下划线模板不会出现在文章、搜索、RSS 中。
- `src/views/About.astro`：关于我、研究方向、荣誉。
- `src/views/CV.astro`：英中两版无照片简历源文件；`src/styles/cv.css`：A4 打印排版。
- `public/images/yujie.jpg`：用户提供的生活照。仅网站首页/About 使用，CV 无照片。
- `public/papers/HER-PDE.pdf`：作者提供的 41 页更新稿。

目前有同一篇示例博客的英语和中文版本，均显著标注，不作为本人已发表博客。发布正式文章后可删除该示例。文章正文是静态 HTML，搜索仅处理本页标题、摘要和标签，不依赖服务器。

## 更新简历 PDF

修改简历源文件后，先运行 `pnpm build`，然后运行 `node scripts/export-cv.mjs`，得到无外部依赖的 `public/files/Yujie-Huang-CV-EN.html` 和 `public/files/Yujie-Huang-CV-ZH.html`。用 Chrome 打开该 HTML，选择打印，A4、无页眉页脚、包含背景，分别保存至 `public/files/Yujie-Huang-CV-EN.pdf` 和 `public/files/Yujie-Huang-CV-ZH.pdf`（默认兼容文件 `Yujie-Huang-CV.pdf` 使用英语版），再构建一次。PDF 不会在每次网站构建时自动更新。

## 页面与交互

首页、Research 列表、两篇独立项目页、Writing 列表与文章、About、CV、404、RSS、sitemap。每种语言均有静态页面和 RSS；有译文时，文章语言按钮对应同一文章，无译文时返回另一语言的列表。移动端使用原生 details 菜单。点云支持暂停并记住设置，遵循系统减少动态偏好；页面离开视口或切到后台时停止运算。禁用 JavaScript 后，导航、文章、论文与简历仍可访问。

## 内容核对与边界

- Thinking in Flow：标题、作者、研究概述来自 ICML 官方页面；Spotlight 身份由本人提供。
- HER-PDE：研究介绍、开放形式标题与结果依据作者更新稿，arXiv 链接及 BibTeX 对应 v1；项目页明确区分版本，标注预印本，不标为 ICLR 录用。作者顺序来自公开 arXiv v1。
- UMI 2026 青年论坛最佳论文提名、2026 一等奖学金 Top 5%、研二身份、研究方向与联系方式由本人提供。
- 不虚构学校起止年月、专业、导师、GPA、编程技能、实习、个人分工、Google Scholar、Hugging Face 或代码仓库。GitHub 链接仅指向个人主页。
- 论文封面图与首页点云为装饰性概念示意，非实验数据。

## GitHub Pages 发布

目标仓库：`IKEJAY-code/IKEJAY-code.github.io`。目标网址：`https://ikejay-code.github.io/`。仓库的 Settings → Pages → Source 选择 **GitHub Actions**，推送到 main 后，`.github/workflows/deploy-pages.yml` 会检查、构建并发布网站。只有工作流成功且网址能打开，才表示上线完成。

项目已针对用户主页根路径配置，因此不需要仓库名 base 前缀。默认 `site` 为 GitHub Pages 地址；如需其他域名，构建时设置 `SITE_URL`，站点地图、canonical、语言链接与可编辑简历的站内地址会一起更新。

`.openai/hosting.json` 仅为原 Sites 副本的身份记录，与 GitHub Pages 运行无关。原站的源代码远程记录保留用于回溯。更新网站后应推送到 GitHub 仓库；完整源码和资源都在当前文件夹。

本地字体为 DM Sans 与 Cormorant Garamond，采用 SIL Open Font License；许可证位于 `public/fonts/`。中文使用系统字体。
