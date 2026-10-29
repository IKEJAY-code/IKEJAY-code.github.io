export interface Paper {
  slug: string;
  shortTitle: string;
  title: string;
  authors: string[];
  venue: string;
  recognition?: string;
  year: number;
  topics: string[];
  summary: string;
  question: string;
  approach: string;
  evidence: string;
  sourceNote: string;
  links: { label: string; href: string; download?: boolean }[];
  citation: string;
}

import type { Lang } from '../lib/i18n';

export const papers: Paper[] = [
  {
    slug: 'thinking-in-flow',
    shortTitle: 'Thinking in Flow',
    title: 'Thinking in Flow: A Dissipative Stabilization Operator for Robust Autoregressive Reasoning',
    authors: ['Yujie Huang', 'Wenwu He', 'Zhuo-Xu Cui'],
    venue: 'ICML 2026',
    recognition: 'Spotlight',
    year: 2026,
    topics: ['LLM Reasoning', 'Dynamical Systems', 'Robustness'],
    summary: '把长程推理看作动态过程，通过连续时间的思维状态与选择性干预，让语言模型在干扰中保持更稳定的推理轨迹。',
    question: '当无关线索持续进入上下文，语言模型怎样避免推理漂移，并在长程生成中积累有效证据？',
    approach: 'Thinking in Flow 将自回归解码视为受扰动的动力系统，以轻量 Neural ODE 控制器维护具有耗散性的连续思维状态。需求—供给门控决定何时干预，方向门控决定如何调整表示。',
    evidence: '论文给出受控思维动力学的适定性、耗散性与增量稳定性分析，并在 Llama 和 Qwen 系列的数学推理任务中研究干扰与语义扰动下的鲁棒性。',
    sourceNote: '论文信息与研究概述来自 ICML 2026 官方论文页面。',
    links: [
      { label: 'ICML 页面', href: 'https://icml.cc/virtual/2026/poster/65866' },
      { label: 'OpenReview', href: 'https://openreview.net/forum?id=9IQpUEKOGM' },
    ],
    citation: '@inproceedings{huang2026thinking,\n  title={Thinking in Flow: A Dissipative Stabilization Operator for Robust Autoregressive Reasoning},\n  author={Huang, Yujie and He, Wenwu and Cui, Zhuo-Xu},\n  booktitle={International Conference on Machine Learning},\n  year={2026}\n}',
  },
  {
    slug: 'her-pde',
    shortTitle: 'HER-PDE',
    title: 'Hypothesize, Evaluate, Refine: A Scientific Agent for Open-Form PDE Discovery with Unknown Spatial Coefficient Fields',
    authors: ['Yujie Huang', 'Wenwu He', 'Zhuoer Lin', 'Congcong Liu', 'Dong Liang', 'Zhuo-Xu Cui'],
    venue: 'arXiv preprint',
    year: 2026,
    topics: ['Scientific Agents', 'PDE Discovery', 'AI for Science'],
    summary: '让科学智能体提出、评估并修正方程假设，同时发现开放形式的 PDE 结构与未知空间系数场。',
    question: '在空间性质不均匀的介质中，能否同时发现控制动力学的微分算子，以及决定其局部作用的未知系数场？',
    approach: 'HER-PDE 将 LLM 科学智能体与假设评估接口 HEI 耦合：智能体组合完整的表达式树；HEI 仅拟合假设中声明的系数场，并利用两种激励下的短时预测反馈引导全局探索与局部修正。',
    evidence: '作者更新稿在七类二维 PDE、35 个环境、105 次运行中报告 70/105 次精确结构恢复与 94.3% Pass@3。在实测微生物轨迹的技术重复验证中，所发现有效模型相对重新拟合的线性参考模型降低 15.7% 连续预测误差。',
    sourceNote: '本页研究概述与结果依据作者提供的 41 页更新稿；公开 arXiv v1 的标题、实验与结果有所不同。作者列表与下方 BibTeX 对应公开 arXiv v1。',
    links: [
      { label: 'arXiv', href: 'https://arxiv.org/abs/2608.27475' },
      { label: '作者更新稿 PDF', href: '/papers/HER-PDE.pdf', download: true },
    ],
    citation: '@misc{huang2026hypothesize,\n  title={Hypothesize, Evaluate, Refine: A Scientific Agent for PDE Discovery with Unknown Spatial Coefficient Fields},\n  author={YuJie Huang and WenWu He and ZhuoEr Lin and Congcong Liu and Dong Liang and Zhuo-Xu Cui},\n  year={2026},\n  eprint={2608.27475},\n  archivePrefix={arXiv},\n  primaryClass={cs.AI},\n  url={https://arxiv.org/abs/2608.27475}\n}',
  },
];

const english: Record<string, Pick<Paper, 'summary' | 'question' | 'approach' | 'evidence' | 'sourceNote' | 'links'>> = {
  'thinking-in-flow': {
    summary: 'Stabilizing long-horizon language-model reasoning with a continuous thought state and selective intervention.',
    question: 'How can a language model avoid reasoning drift and accumulate useful evidence when irrelevant cues persist in a long context?',
    approach: 'Thinking in Flow models autoregressive decoding as a perturbed dynamical system. A lightweight Neural ODE controller maintains a dissipative continuous thought state. A demand–supply gate determines when to intervene; a direction gate determines how to steer the representation.',
    evidence: 'The paper analyzes well-posedness, dissipativity, and incremental stability, and studies robustness to distractions and semantic perturbations on mathematical reasoning tasks using the Llama and Qwen model families.',
    sourceNote: 'Paper metadata and the research overview are based on the official ICML 2026 paper page.',
    links: [{ label: 'ICML page', href: 'https://icml.cc/virtual/2026/poster/65866' }, { label: 'OpenReview', href: 'https://openreview.net/forum?id=9IQpUEKOGM' }],
  },
  'her-pde': {
    summary: 'A scientific agent that hypothesizes, evaluates, and refines open-form PDE structures together with unknown spatial coefficient fields.',
    question: 'Can we jointly discover a governing differential operator and the unknown coefficient fields that determine its local action in heterogeneous media?',
    approach: 'HER-PDE couples an LLM scientific agent with the Hypothesis Evaluation Interface (HEI). The agent composes complete expression trees; HEI fits only the fields declared in each hypothesis and scores short-horizon prediction across two excitations, guiding global exploration and local refinement.',
    evidence: 'The author’s updated manuscript reports 70/105 exact structure recoveries and 94.3% Pass@3 across seven two-dimensional PDE families and 35 environments. In technical-repeat validation on measured microbial trajectories, the discovered effective model reduces continuous-prediction error by 15.7% relative to a refitted linear reference.',
    sourceNote: 'This overview and its results follow the author’s updated 41-page manuscript. The public arXiv v1 has a different title, experimental scope, and results. The author list and BibTeX below refer to the public arXiv v1.',
    links: [{ label: 'arXiv', href: 'https://arxiv.org/abs/2608.27475' }, { label: 'Updated manuscript PDF', href: '/papers/HER-PDE.pdf', download: true }],
  },
};

export function getPapers(lang: Lang = 'en'): Paper[] {
  return lang === 'en' ? papers.map(paper => ({ ...paper, ...english[paper.slug] })) : papers;
}
