export const coreProjects = [
  {
    id: 'cnschema-onegraph',
    name: 'cnSchema / OneGraph',
    tagline: '面向大模型的开放知识图谱底座',
    layer: '数据层',
    color: '#38bdf8',
    glyph: 'graph',
    sig: 'SIGData',
    short:
      '从 cnSchema 中文 Schema 参考标准，到 OneGraph 大模型驱动的四层结构知识图谱，构建以中文为核心、面向 LLM 的高质量结构化知识底座。',
    highlights: [
      'cnSchema 复用 Schema.ORG / Wikidata 等标准，沉淀中文领域 Schema 共识',
      'OneGraph 包含 cnSchema、概念图、实体图、文本图四个层级',
      '提供 OneGraph-R 检索与 OneGraph-R-G 检索增强生成两种调用模式',
      '在 C-Eval 等评测中验证大模型 + KG 的可控、可解释能力'
    ],
    keywords: ['Schema 标准', '概念图', '实体图', 'LLMKG', 'GraphRAG'],
    link: 'http://onegraph.openkg.cn/'
  },
  {
    id: 'spg-kag',
    name: 'SPG / KAG',
    tagline: '知识增强生成的推理新范式',
    layer: '推理层',
    color: '#22d3ee',
    glyph: 'reason',
    sig: 'SIGSPG',
    short:
      'OpenSPG 提供严谨的语义底座，KAG 通过 Agentic RAG 实现混合推理，KAG-Thinker 将逻辑推理能力内化到模型层，构建“语义底座 → 推理框架 → 推理模型”的三层递进体系。',
    highlights: [
      'OpenSPG：动态本体（Dynamic Ontology），承担 LLM 的事实底座角色',
      'KAG-Solver：Planner / Executor / Generator 闭环架构',
      'KAG-Thinker：自然语言 + 符号表达式（Logical Form）混合推理',
      '有效缓解 RAG 在指代、时空、数值、逻辑四个维度的偏差'
    ],
    keywords: ['Agentic RAG', '逻辑推理', '多跳问答', 'KAG Index Diffusion'],
    link: 'https://openspg.github.io/v2/'
  },
  {
    id: 'oneeval',
    name: 'OneEval',
    tagline: '大模型知识推理能力的深度诊断',
    layer: '评测层',
    color: '#818cf8',
    glyph: 'eval',
    sig: 'SIGEval',
    short:
      '面向大模型 + 知识库的系统化评测体系，覆盖文本、表格、知识图谱、代码、逻辑五种知识库类型与五大领域，并推出 Dynamic OneEval 实现持续动态演化。',
    highlights: [
      '覆盖通用、税务、经济、法律、学术 5 个领域',
      'V1.0 → V1.3 持续迭代，沉淀知识增强评测榜单',
      'Dynamic OneEval：错误分析 → 难点再现 → 多模型投票保真',
      '为大模型知识增强能力提供权威观测窗口'
    ],
    keywords: ['评测基准', '知识推理', '动态评测', '榜单'],
    link: 'http://oneeval.openkg.cn/'
  },
  {
    id: 'skillnet',
    name: 'SkillNet',
    tagline: '智能体时代的知识工程新范式',
    layer: 'Agent 层',
    color: '#60a5fa',
    glyph: 'agent',
    sig: 'SIGAgent',
    short:
      '面向 Agent 时代重新定义“技能即知识”的协作网络，将知识图谱的全生命周期能力封装为可调度的 MCP 工具，实现多工具编排与智能体技能共享。',
    highlights: [
      '将知识抽取、对齐、推理等能力封装为标准化技能（Skill）',
      'MCP 协议统一封装，支持多智能体协同与工具编排',
      '推动 KG 工具链的自动化、可组合化',
      '构建面向 AGI 的知识技能开放协作网络'
    ],
    keywords: ['Agent', 'MCP', '技能编排', '工具链'],
    link: 'http://openkg.cn/'
  },
  {
    id: 'scigraph',
    name: 'SciGraph',
    tagline: '面向科学发现的开放知识图谱',
    layer: '科研层',
    color: '#7dd3fc',
    glyph: 'science',
    sig: 'SIGModel',
    short:
      '面向科学知识与跨学科研究的开放知识图谱基础设施，融合论文、实体、概念与因果证据，支撑大模型在科研发现、文献综述与假设生成中的应用。',
    highlights: [
      '汇聚科技文献、学者、机构、实体与概念图谱',
      '面向 AI for Science 的知识增强基础底座',
      '支持假设生成、证据链路检索、科学问答',
      '与大模型结合实现端到端科研助理能力'
    ],
    keywords: ['AI4Science', '科技文献', '学术图谱', '科研发现'],
    link: 'http://openkg.cn/'
  }
]

export const sigs = [
  {
    id: 'sigdata',
    name: 'SIGData',
    project: 'cnSchema / OneGraph',
    projectId: 'cnschema-onegraph',
    color: '#38bdf8',
    desc: '致力于开源辅助大模型落地的结构化知识图谱数据，并提供结构化数据获取平台。',
    contact: 'zhang.wen@zju.edu.cn'
  },
  {
    id: 'sigspg',
    name: 'SIGSPG',
    project: 'SPG / KAG',
    projectId: 'spg-kag',
    color: '#22d3ee',
    desc: '构建基于真实业务场景、工业易用的知识图谱语义框架，提升大模型生成的可控性与可解释性。',
    contact: 'leywar.liang@antgroup.com'
  },
  {
    id: 'sigeval',
    name: 'SIGEval',
    project: 'OneEval',
    projectId: 'oneeval',
    color: '#818cf8',
    desc: '聚焦知识图谱与大模型评测，建设动态、权威、覆盖多领域的评测基准与榜单。',
    contact: 'bisheng@seu.edu.cn'
  },
  {
    id: 'sigagent',
    name: 'SIGAgent',
    project: 'SkillNet',
    projectId: 'skillnet',
    color: '#60a5fa',
    desc: '推动知识图谱与大模型智能体技术的发展，构建技能化、可组合的知识工程新范式。',
    contact: 'zhangningyu@zju.edu.cn'
  },
  {
    id: 'sigmodel',
    name: 'SIGModel',
    project: 'SciGraph',
    projectId: 'scigraph',
    color: '#7dd3fc',
    desc: '探索“知识图谱 + 大模型”协同发展的技术路径，并面向科学发现构建 SciGraph 基础设施。',
    contact: 'wlchen@suda.edu.cn'
  },
  {
    id: 'sigtool',
    name: 'SIGTool',
    project: '工具链与开源协同',
    projectId: null,
    color: '#a78bfa',
    desc: '维护和优化 OpenKG 社区的知识图谱与大模型开源工具，促进知识共享与价值增值。',
    contact: 'whu@nju.edu.cn'
  }
]

export const founders = [
  {
    name: '陈华钧',
    role: '牵头发起人 · TOC 主席',
    org: '浙江大学 教授',
    bio:
      'OpenKG 牵头发起人，浙江大学计算机学院教授、博导。中国人工智能学会知识工程专业委员会副主任、中国中文信息学会语言与知识计算专业委员会副主任，长期引领大模型时代的知识工程方向。',
    badge: 'Lead',
    accent: '#38bdf8'
  },
  {
    name: '漆桂林',
    role: '联合发起人 · 管理委员',
    org: '东南大学 教授',
    bio:
      'OpenKG 联合发起人，东南大学计算机学院教授、东南大学认知智能研究所所长，长期致力于知识图谱、本体推理与大模型双轮驱动的产业落地。',
    accent: '#22d3ee'
  },
  {
    name: '王昊奋',
    role: '联合发起人 · 管理委员 · 轮值主席',
    org: '同济大学 研究员',
    bio:
      'OpenKG 联合发起人，同济大学研究员，CCF 理事，中文知识图谱 zhishi.me 创始人，OpenKG TOC 轮值主席，持续推动知识图谱社区与大模型技术融合。',
    accent: '#60a5fa'
  },
  {
    name: '胡伟',
    role: '管理委员',
    org: '南京大学 教授',
    bio:
      'OpenKG 管理委员，南京大学计算机学院教授，长期从事知识图谱表示、对齐、推理与大模型增强方法的研究，主导 SIGTool 工具链建设。',
    accent: '#818cf8'
  },
  {
    name: '陈文亮',
    role: '管理委员',
    org: '苏州大学 教授',
    bio:
      'OpenKG 管理委员，苏州大学教授，研究方向涵盖自然语言处理、知识图谱与大模型协同，主导 SIGModel 在“知识图谱 + 大模型”的协同探索。',
    accent: '#a78bfa'
  }
]

export const news = [
  {
    title: '大模型时代的知识工程：OpenKG 年度回顾（2025-2026）',
    date: '2026-02-20',
    tag: '年度回顾',
    summary:
      '从 OneGraph、SPG+KAG、SkillNet 到 OneEval，系统回顾大模型时代知识工程的四大代表性工作与未来趋势。'
  },
  {
    title: 'OneEval V1.3 发布，新增 Dynamic OneEval 动态评测体系',
    date: '2026-01-15',
    tag: '评测',
    summary:
      'OneEval 持续迭代至 V1.3 版本，新增基于错误分析的动态难题生成机制，让评测随大模型能力共同进化。'
  },
  {
    title: 'SIGSPG 发布 KAG-Thinker：把推理能力内化到模型层',
    date: '2025-12-08',
    tag: '推理',
    summary:
      'KAG-Thinker 通过自然语言 + 符号表达式（Logical Form）混合推理范式，让逻辑推理能力成为模型原生能力。'
  },
  {
    title: 'OneGraph 新版本上线：从规模缩放转向结构缩放',
    date: '2025-10-30',
    tag: '数据',
    summary:
      'OneGraph 进一步丰富 cnSchema、概念图、实体图、文本图四层结构，破解大模型的“结构性瓶颈”。'
  },
  {
    title: 'SkillNet 启动：以技能即知识重构 Agent 时代知识工程',
    date: '2025-09-12',
    tag: 'Agent',
    summary:
      'SIGAgent 牵头启动 SkillNet 项目，将知识图谱全生命周期能力封装为可被智能体调度的标准化技能。'
  },
  {
    title: 'IEEE P2807.7《开放域知识图谱发布和众包服务指南》编制启动',
    date: '2024-11-22',
    tag: '标准',
    summary:
      'OpenKG 联合多家单位推动 IEEE P2807.7 国际标准编制工作，推动开放域知识图谱发布的规范化。'
  }
]

export const stats = [
  { value: '300+', label: '开放知识图谱数据集', accent: '#38bdf8' },
  { value: '6', label: '核心兴趣小组 SIG', accent: '#22d3ee' },
  { value: '10+', label: '高校与产业核心机构', accent: '#60a5fa' },
  { value: '10年+', label: '社区持续运营', accent: '#818cf8' }
]

export const milestones = [
  { year: '2015', title: 'OpenKG 创立', desc: '由中文信息学会语言与知识计算专委会发起，开启中文开放知识图谱社区。' },
  { year: '2018', title: 'cnSchema 1.0 发布', desc: '面向中文领域的开放 Schema 参考标准正式发布。' },
  { year: '2022', title: 'OpenKG TOC 成立', desc: '技术监督委员会（TOC）成立，建立社区技术治理机制。' },
  { year: '2023', title: 'OpenSPG / KAG 开源', desc: '蚂蚁集团联合 OpenKG 推出 OpenSPG 与 KAG 框架。' },
  { year: '2024', title: 'OneGraph 发布', desc: 'SIGData 推出大模型驱动的开放知识图谱 OneGraph。' },
  { year: '2025', title: 'OneEval / SkillNet', desc: 'OneEval 评测榜单与 SkillNet 智能体技能网络陆续发布。' },
  { year: '2026', title: '通用人工智能时代的知识底座', desc: '面向 AGI 重构人类知识表示与组织逻辑。' }
]
