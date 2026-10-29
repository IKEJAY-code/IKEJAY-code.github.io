export type Lang = 'en' | 'zh';
export const isChinese = (lang: Lang) => lang === 'zh';
export const localPath = (lang: Lang, path = '/') => lang === 'zh' ? `/zh${path}` : path;
export const alternatePath = (path: string) => path.startsWith('/zh/') ? path.slice(3) : `/zh${path}`;
export const text = (lang: Lang, en: string, zh: string) => lang === 'en' ? en : zh;
export const cvFile = (lang: Lang, format = 'pdf') => `/files/Yujie-Huang-CV-${lang.toUpperCase()}.${format}`;
export const ui = {
  en: {
    nav: ['Home', 'Research', 'Writing', 'About'], skip: 'Skip to content', home: 'Yujie Huang home', mainNav: 'Main navigation', mobileNav: 'Mobile navigation', openNav: 'Open navigation', contact: 'Let’s talk',
    tagline: 'Stay curious. Let ideas grow.', backTop: 'Back to top',
    research: 'Research', writing: 'Writing', about: 'About / CV', allResearch: 'All research', allWriting: 'All writing', moreAbout: 'More about me',
    example: 'Example post', read: 'Read', minute: 'MIN READ', notes: 'NOTES',
    subscribe: 'Subscribe via RSS', search: 'Search titles, summaries, and tags', placeholder: 'Search titles, summaries, tags…', filter: 'Filter by topic', allNotes: 'All notes',
    noResults: 'No notes found.', noResultsHelp: 'Try another keyword, or clear the filters.', clear: 'Clear filters',
    exampleNotice: 'Example post · This text demonstrates the reading experience and is not a published article by the author.',
    exampleArchive: 'Posts marked “Example post” demonstrate the reading experience and are not published articles by the author.',
    noJS: 'All posts are shown. Enable JavaScript to search or filter by topic.',
    question: 'The question', approach: 'The approach', evidence: 'Evidence & scope', source: 'Versions & sources', bibtex: 'BibTeX citation', copy: 'Copy citation',
    researchNotes: 'RESEARCH NOTES', keepExploring: 'KEEP EXPLORING',
    plotNote: 'Cover graphics are conceptual illustrations, not experimental results. Open a project for methods, sources, and paper links.',
    photo: 'Yujie Huang wearing headphones and holding a record', portrait: 'Portrait of Yujie Huang',
    download: 'Download PDF', viewCV: 'View CV', pause: 'Pause', play: 'Play', pauseMotion: 'Pause animation', playMotion: 'Play animation',
    fieldLabel: 'An abstract rotating point cloud representing exploration; not experimental data', fieldCaption: 'A FIELD OF POSSIBILITIES',
  },
  zh: {
    nav: ['首页', '研究', '写作', '关于'], skip: '跳转到正文', home: '黄裕杰首页', mainNav: '主导航', mobileNav: '移动端导航', openNav: '打开导航', contact: '联系我',
    tagline: '保持好奇，让想法生长。', backTop: '回到顶部',
    research: '研究', writing: '写作', about: '关于 / 简历', allResearch: '全部研究', allWriting: '全部文章', moreAbout: '了解更多',
    example: '示例文章', read: '阅读', minute: '分钟阅读', notes: '篇笔记',
    subscribe: '订阅 RSS', search: '搜索文章标题、摘要和标签', placeholder: '搜索标题、摘要、标签…', filter: '按标签筛选', allNotes: '全部笔记',
    noResults: '还没有匹配的笔记。', noResultsHelp: '试试其他关键词，或清除筛选。', clear: '清除筛选',
    exampleNotice: '示例文章 · 用于展示博客排版与阅读体验，不作为作者已发表文章或经历。',
    exampleArchive: '带「示例文章」标记的内容用于展示阅读体验，尚非本人正式发表的博客。',
    noJS: '当前展示全部文章。启用 JavaScript 后可使用搜索和标签筛选。',
    question: '一个问题', approach: '如何探索', evidence: '证据与边界', source: '版本与来源', bibtex: 'BibTeX 引用', copy: '复制引用',
    researchNotes: '研究笔记', keepExploring: '继续探索',
    plotNote: '图形为概念示意，非实验结果。点击项目可查看方法、来源和论文链接。',
    photo: '黄裕杰戴着耳机，展示一张唱片', portrait: '黄裕杰的照片',
    download: '下载 PDF', viewCV: '查看简历', pause: '暂停', play: '播放', pauseMotion: '暂停动效', playMotion: '播放动效',
    fieldLabel: '缓慢旋转的点云，作为探索与思考的抽象视觉意象，并非论文数据', fieldCaption: '可能性的场域',
  },
} as const;
