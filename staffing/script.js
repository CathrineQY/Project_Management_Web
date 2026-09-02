const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const people = [
  { id: 1, name: '林书遥', group: '核心组', role: '项目总负责人', skills: ['项目统筹', '风险决策', '系统验收'], status: 'busy', load: 88, phone: '核心接口人' },
  { id: 2, name: '杨淇雅', group: '核心组', role: '进度与资源经理', skills: ['WBS', '排班', '里程碑'], status: 'available', load: 68, phone: '资源调度' },
  { id: 3, name: '陈妍伶', group: '核心组', role: '成本与风险经理', skills: ['成本基线', '风险矩阵', '收尾'], status: 'available', load: 55, phone: '成本控制' },
  { id: 4, name: '蔡之乐', group: '核心组', role: '需求与质量经理', skills: ['RTM', '测试验收', '文档'], status: 'busy', load: 79, phone: '质量接口' },
  { id: 5, name: '王子岳', group: '核心组', role: '系统集成负责人', skills: ['接口联调', '飞控通信', '故障定位'], status: 'busy', load: 91, phone: '技术接口' },
  { id: 6, name: '黄裕滨', group: '飞行组', role: '主飞手', skills: ['航点飞行', '应急处置', '空域观察'], status: 'available', load: 72, phone: '飞行一号位' },
  { id: 7, name: '王思上', group: '飞行组', role: '副飞手', skills: ['起降检查', '遥控接管', '电池管理'], status: 'available', load: 47, phone: '飞行二号位' },
  { id: 8, name: '张晨', group: '飞行组', role: '飞控工程师', skills: ['PX4', '航点导入', '日志分析'], status: 'busy', load: 83, phone: '飞控调试' },
  { id: 9, name: '刘洋', group: '飞行组', role: '机务保障', skills: ['机体检查', '桨叶维护', '载荷安装'], status: 'available', load: 42, phone: '机务接口' },
  { id: 10, name: '周敏', group: '现场组', role: '现场总协调', skills: ['场地管控', '流程口令', '人员疏导'], status: 'busy', load: 76, phone: '现场接口' },
  { id: 11, name: '郑楠', group: '现场组', role: 'AED 急救员', skills: ['AED 操作', '心肺复苏', '急救教学'], status: 'available', load: 64, phone: '急救一号位' },
  { id: 12, name: '孙悦', group: '现场组', role: '安全观察员', skills: ['安全边界', '天气观察', '异常上报'], status: 'available', load: 51, phone: '安全观察' },
  { id: 13, name: '李欣', group: '现场组', role: '志愿者联络员', skills: ['志愿者组织', '签到', '应急广播'], status: 'off', load: 30, phone: '待补位' },
  { id: 14, name: '何嘉', group: '保障组', role: '通信保障', skills: ['图传链路', '网络测试', '对讲调度'], status: 'available', load: 59, phone: '通信接口' },
  { id: 15, name: '吴桐', group: '保障组', role: '数据记录员', skills: ['测试记录', '视频采集', '数据归档'], status: 'available', load: 44, phone: '数据接口' },
  { id: 16, name: '赵清', group: '保障组', role: '物资管理员', skills: ['电池周转', '物资清单', '设备签收'], status: 'available', load: 38, phone: '物资接口' },
  { id: 17, name: '唐可', group: '保障组', role: '演示与讲解', skills: ['成果讲解', '演示控制', '观众引导'], status: 'available', load: 48, phone: '展示接口' }
];

const initialTasks = [
  { id: '4.3.1', title: '飞行前整机检查', desc: '完成机体、桨叶、电池、挂载与遥控链路的逐项检查。', time: '08:30', end: '09:30', risk: 'medium', status: '已完成', roles: ['主飞手', '机务保障'], assigned: [6, 9] },
  { id: '4.3.2', title: '航点与电子围栏复核', desc: '核对校园航点、限高、返航点与应急备降区。', time: '09:30', end: '10:30', risk: 'medium', status: '已完成', roles: ['飞控工程师', '安全观察员'], assigned: [8, 12] },
  { id: '5.2.1', title: '小程序—调度链路联调', desc: '验证呼救请求、坐标下发、任务状态回传和异常重试。', time: '10:30', end: '12:00', risk: 'high', status: '已就绪', roles: ['系统集成负责人', '通信保障'], assigned: [5, 14] },
  { id: '5.2.2', title: 'AED 投送机构地面测试', desc: '执行十次舵机开合与载荷释放测试并记录结果。', time: '11:00', end: '12:00', risk: 'medium', status: '已就绪', roles: ['机务保障', '数据记录员'], assigned: [9, 15] },
  { id: '5.3.1', title: '全流程实地联调', desc: '走通呼救、调度、起飞、航迹执行、投送和现场急救流程。', time: '14:00', end: '15:30', risk: 'high', status: '部分到位', roles: ['主飞手', '现场总协调', 'AED 急救员', '志愿者联络员'], assigned: [6, 10, 11] },
  { id: '5.3.2', title: '异常返航与人工接管演练', desc: '模拟低电量和链路波动，验证返航与飞手接管口令。', time: '15:30', end: '16:30', risk: 'high', status: '待分配', roles: ['副飞手', '飞控工程师', '安全观察员'], assigned: [] },
  { id: '6.1.1', title: '成果视频与数据归档', desc: '整理实飞视频、仿真结果、检查表和问题闭环记录。', time: '16:30', end: '17:30', risk: 'low', status: '待分配', roles: ['数据记录员', '需求与质量经理'], assigned: [15] },
  { id: '6.2.1', title: '最终演示彩排', desc: '按汇报脚本检查展示网页、调度台和现场口播衔接。', time: '17:00', end: '18:00', risk: 'medium', status: '待分配', roles: ['演示与讲解', '项目总负责人'], assigned: [17] }
];

let tasks = structuredClone(initialTasks);
let activeTaskId = null;
let personFilter = 'all';

const statusClass = { '已完成': 'done', '已就绪': 'ready', '部分到位': 'partial', '待分配': 'open' };
const statusLabel = { available: '可调度', busy: '任务中', off: '未到岗' };

function initials(name) { return name.slice(-1); }
function personById(id) { return people.find(person => person.id === Number(id)); }
function roleMatch(person, role) { return person.role.includes(role) || person.skills.some(skill => role.includes(skill) || skill.includes(role.replace('负责人', ''))); }
function showToast(message, error = false) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.className = `toast show${error ? ' error' : ''}`;
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => { toast.className = 'toast'; }, 2300);
}

function switchView(name) {
  $$('.nav-item').forEach(item => item.classList.toggle('active', item.dataset.view === name));
  $$('.view').forEach(view => view.classList.toggle('active', view.dataset.viewPanel === name));
  const labels = { overview: '调度总览', people: '岗位池', allocation: '任务分配', schedule: '调度排班', wbs: '扩展 WBS' };
  $('#view-label').textContent = labels[name];
  $('#sidebar').classList.remove('open');
  history.replaceState(null, '', `#${name}`);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (name === 'allocation') renderTaskList();
}

$$('[data-view]').forEach(button => button.addEventListener('click', () => switchView(button.dataset.view)));
$$('[data-go]').forEach(button => button.addEventListener('click', () => switchView(button.dataset.go)));
$('#menu-button').addEventListener('click', () => $('#sidebar').classList.toggle('open'));

function renderOverview() {
  const flow = $('#overview-tasks');
  flow.innerHTML = tasks.slice(0, 4).map(task => {
    const avatars = task.assigned.slice(0, 3).map(id => `<span class="avatar">${initials(personById(id).name)}</span>`).join('');
    const more = task.assigned.length > 3 ? `<span class="avatar more">+${task.assigned.length - 3}</span>` : '';
    return `<div class="flow-row"><div class="flow-time">${task.time}<small>${task.end}</small></div><i class="flow-color ${task.risk}"></i><div class="flow-main"><strong>${task.title}</strong><span>${task.id} · ${task.roles.join(' / ')}</span></div><div><div class="flow-assignees">${avatars}${more}</div><span class="status-pill ${statusClass[task.status]}">${task.status}</span></div></div>`;
  }).join('');

  const coverage = [
    ['飞行与机务', 100, '4 / 4', ''], ['系统与通信', 100, '3 / 3', ''], ['现场急救', 75, '3 / 4', 'warn'], ['记录与物资', 100, '3 / 3', ''], ['演示与协调', 67, '2 / 3', 'warn']
  ];
  $('#coverage-list').innerHTML = coverage.map(item => `<div class="coverage-row"><span>${item[0]}</span><div class="coverage-bar"><i class="${item[3]}" style="width:${item[1]}%"></i></div><b>${item[2]}</b></div>`).join('');

  $('#metric-tasks').innerHTML = `${tasks.length}<small>项</small>`;
  $('#metric-complete').textContent = tasks.filter(task => task.status === '已完成').length;
  $('#open-task-count').textContent = tasks.filter(task => task.status !== '已完成').length;
  renderTimeline($('#mini-timeline'), people.slice(0, 5), false);
}

function renderPeople() {
  const keyword = $('#people-search').value.trim().toLowerCase();
  const availableOnly = $('#available-only').checked;
  const filtered = people.filter(person => {
    const matchesGroup = personFilter === 'all' || person.group === personFilter;
    const matchesAvailability = !availableOnly || person.status === 'available';
    const haystack = `${person.name}${person.role}${person.skills.join('')}`.toLowerCase();
    return matchesGroup && matchesAvailability && haystack.includes(keyword);
  });
  $('#people-summary').innerHTML = `<span class="summary-chip">当前结果 <b>${filtered.length}</b></span><span class="summary-chip">可调度 <b>${filtered.filter(p => p.status === 'available').length}</b></span><span class="summary-chip">高负荷 <b>${filtered.filter(p => p.load >= 80).length}</b></span>`;
  $('#people-grid').innerHTML = filtered.map(person => `<article class="person-card" data-person="${person.id}" tabindex="0"><div class="person-head"><span class="avatar">${initials(person.name)}</span><div><h3>${person.name}</h3><p>${person.group} · ${person.role}</p></div><i class="availability-dot ${person.status === 'busy' ? 'busy' : person.status === 'off' ? 'off' : ''}" title="${statusLabel[person.status]}"></i></div><div class="person-skills">${person.skills.map(skill => `<span class="skill">${skill}</span>`).join('')}</div><div class="person-load-head"><span>当前负荷</span><b>${person.load}%</b></div><div class="load-bar"><i class="${person.load >= 80 ? 'high' : ''}" style="width:${person.load}%"></i></div><div class="person-foot"><span>${statusLabel[person.status]}</span><strong>${person.phone}</strong></div></article>`).join('');
  $('#people-empty').hidden = filtered.length > 0;
  $$('[data-person]').forEach(card => card.addEventListener('click', () => openPerson(card.dataset.person)));
}

function openPerson(id) {
  const person = personById(id);
  const assigned = tasks.filter(task => task.assigned.includes(person.id));
  $('#person-detail').innerHTML = `<div class="person-detail-head"><span class="avatar">${initials(person.name)}</span><div><h2>${person.name}</h2><p>${person.group} · ${person.role}</p></div></div><div class="person-detail-body"><section class="detail-section"><h3>资源状态</h3><div class="detail-facts"><div><span>当前状态</span><strong>${statusLabel[person.status]}</strong></div><div><span>任务负荷</span><strong>${person.load}%</strong></div><div><span>接口职责</span><strong>${person.phone}</strong></div></div></section><section class="detail-section"><h3>能力标签</h3><div class="person-skills">${person.skills.map(skill => `<span class="skill">${skill}</span>`).join('')}</div></section><section class="detail-section"><h3>当日任务</h3>${assigned.length ? assigned.map(task => `<div class="detail-task"><span>${task.time} · ${task.title}</span><b>${task.status}</b></div>`).join('') : '<p class="assignment-desc">暂无已分配任务，可安排补位。</p>'}</section></div>`;
  $('#person-dialog').showModal();
}

$('#people-search').addEventListener('input', renderPeople);
$('#available-only').addEventListener('change', renderPeople);
$$('#people-filters button').forEach(button => button.addEventListener('click', () => {
  $$('#people-filters button').forEach(item => item.classList.remove('active'));
  button.classList.add('active');
  personFilter = button.dataset.filter;
  renderPeople();
}));

$('#export-people').addEventListener('click', () => {
  const rows = ['姓名,分组,岗位,状态,负荷,技能', ...people.map(p => `${p.name},${p.group},${p.role},${statusLabel[p.status]},${p.load}%,${p.skills.join('|')}`)];
  const blob = new Blob(['\ufeff' + rows.join('\n')], { type: 'text/csv;charset=utf-8' });
  const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = 'AED项目人员调度清单.csv'; link.click(); URL.revokeObjectURL(link.href);
  showToast('岗位清单已导出');
});

function renderTaskList() {
  const keyword = $('#task-search').value.trim().toLowerCase();
  const status = $('#task-status-filter').value;
  const filtered = tasks.filter(task => (status === 'all' || task.status === status) && `${task.id}${task.title}`.toLowerCase().includes(keyword));
  $('#task-list').innerHTML = filtered.map(task => `<button class="task-item ${task.id === activeTaskId ? 'active' : ''}" type="button" data-task="${task.id}"><div class="task-code"><span>WBS ${task.id}</span><span class="status-pill ${statusClass[task.status]}">${task.status}</span></div><h3>${task.title}</h3><div class="task-meta"><span>${task.time}—${task.end}</span><span>${task.assigned.length} / ${task.roles.length} 人</span></div></button>`).join('');
  $$('[data-task]').forEach(button => button.addEventListener('click', () => { activeTaskId = button.dataset.task; renderTaskList(); renderAssignment(); }));
}

function renderAssignment() {
  const task = tasks.find(item => item.id === activeTaskId);
  if (!task) return;
  const roles = task.roles.map(role => {
    const covered = task.assigned.some(id => roleMatch(personById(id), role));
    return `<div class="role-requirement"><span>${role}</span><b class="${covered ? '' : 'missing'}">${covered ? '已覆盖' : '待补位'}</b></div>`;
  }).join('');
  const candidates = people.filter(person => person.status !== 'off').sort((a, b) => Number(task.roles.some(r => roleMatch(b, r))) - Number(task.roles.some(r => roleMatch(a, r))) || a.load - b.load);
  $('#assignment-panel').innerHTML = `<div class="assignment-content"><span class="assignment-code">WBS ${task.id}</span><h2>${task.title}</h2><p class="assignment-desc">${task.desc}</p><div class="task-facts"><div><span>执行窗口</span><strong>${task.time}—${task.end}</strong></div><div><span>风险等级</span><strong>${task.risk === 'high' ? '高' : task.risk === 'medium' ? '中' : '低'}</strong></div><div><span>人员需求</span><strong>${task.roles.length} 人</strong></div></div><section class="required-roles"><h3>岗位覆盖要求</h3>${roles}</section><section class="candidate-section"><h3>候选人员</h3><div class="candidate-list">${candidates.map(person => `<label class="candidate"><input type="checkbox" value="${person.id}" ${task.assigned.includes(person.id) ? 'checked' : ''}><div><strong>${person.name} · ${person.role}</strong><small>${person.skills.join(' / ')}</small></div><span class="${person.load >= 85 ? 'conflict' : ''}">${person.load}% 负荷</span></label>`).join('')}</div></section><div class="assignment-actions"><button class="unassign-button" id="clear-assignment" type="button">清空分配</button><button class="assign-button" id="save-assignment" type="button">保存分配</button></div></div>`;
  $('#save-assignment').addEventListener('click', saveAssignment);
  $('#clear-assignment').addEventListener('click', () => { task.assigned = []; task.status = '待分配'; renderTaskList(); renderAssignment(); renderOverview(); showToast('已清空任务分配'); });
}

function saveAssignment() {
  const task = tasks.find(item => item.id === activeTaskId);
  task.assigned = $$('.candidate input:checked', $('#assignment-panel')).map(input => Number(input.value));
  const coveredCount = task.roles.filter(role => task.assigned.some(id => roleMatch(personById(id), role))).length;
  task.status = coveredCount === task.roles.length ? '已就绪' : task.assigned.length ? '部分到位' : '待分配';
  renderTaskList(); renderAssignment(); renderOverview(); renderSchedule();
  showToast(`已保存 ${task.title} 的人员分配`);
}

$('#task-search').addEventListener('input', renderTaskList);
$('#task-status-filter').addEventListener('change', renderTaskList);

function hourNumber(value) { const [h, m] = value.split(':').map(Number); return h + m / 60; }
function renderTimeline(container, rows, full) {
  const labelWidth = full ? 19.5 : 16.4;
  const head = `<div class="time-head"><span>人员 / 岗位</span>${Array.from({ length: 10 }, (_, i) => `<span>${String(i + 8).padStart(2, '0')}:00</span>`).join('')}</div>`;
  const body = rows.map(person => {
    const personTasks = tasks.filter(task => task.assigned.includes(person.id));
    const cells = Array.from({ length: 10 }, () => '<i class="hour-cell"></i>').join('');
    const blocks = personTasks.map(task => {
      const start = Math.max(0, hourNumber(task.time) - 8) / 10;
      const duration = (hourNumber(task.end) - hourNumber(task.time)) / 10;
      const left = labelWidth + start * (100 - labelWidth);
      const width = Math.max(5, duration * (100 - labelWidth));
      return `<span class="timeline-block ${task.risk}" style="left:${left}%;width:${width}%" title="${task.title}">${task.title}</span>`;
    }).join('');
    return `<div class="timeline-row"><div class="timeline-label"><span class="avatar">${initials(person.name)}</span><div><strong>${person.name}</strong><small>${person.role}</small></div></div>${cells}${blocks}</div>`;
  }).join('');
  container.innerHTML = `<div class="${full ? 'timeline-grid' : 'mini-timeline-grid'}">${head}${body}${full ? '<i class="now-line" style="left:64%"></i>' : ''}</div>`;
}

function renderSchedule() {
  renderTimeline($('#full-timeline'), people.filter(p => p.status !== 'off').slice(0, 10), true);
  $('#handoff-list').innerHTML = `<div class="info-list"><div class="info-row"><span>12:50</span><div><strong>机务 → 主飞手</strong><small>电池与挂载检查表签字交接</small></div><b>待确认</b></div><div class="info-row"><span>13:30</span><div><strong>通信 → 现场协调</strong><small>对讲频道和异常口令复核</small></div><b>已安排</b></div><div class="info-row"><span>15:30</span><div><strong>飞行组 → 数据组</strong><small>飞控日志与实飞视频归档</small></div><b>待执行</b></div></div>`;
  $('#conflict-list').innerHTML = `<div class="conflict-box high"><strong>全流程联调存在岗位缺口</strong><p>志愿者联络员未到岗，建议由保障组唐可临时兼任现场签到。</p></div><div class="conflict-box"><strong>飞控工程师负荷偏高</strong><p>张晨连续参与航点复核、链路联调和返航演练，建议副飞手承担部分日志检查。</p></div>`;
}

const wbsTree = {
  id: 'root', code: 'AED', title: '无人机 AED 智能应急投送系统', owner: '项目总负责人', children: [
    { id: 'management', code: '1—2', title: '项目与需求管理', owner: '项目管理组', children: [
      { id: 'scope', code: '1.3', title: '需求与范围基线', owner: '需求经理', children: [
        { id: 'rtm', code: '1.3.1', title: 'RTM 状态更新', owner: '蔡之乐' },
        { id: 'change', code: '1.3.2', title: '变更影响复核', owner: '林书遥' }
      ]},
      { id: 'progress', code: '2.2', title: '进度与资源控制', owner: '进度经理', children: [
        { id: 'roster', code: '2.2.1', title: '日排班发布', owner: '杨淇雅' },
        { id: 'critical', code: '2.2.2', title: '关键路径检查', owner: '杨淇雅' }
      ]}
    ]},
    { id: 'algorithm', code: '3', title: '算法与地图', owner: '算法组', children: [
      { id: 'map', code: '3.1', title: '地图处理', owner: '地图工程师', children: [
        { id: 'inflate', code: '3.1.1', title: '障碍膨胀复核', owner: '算法组' },
        { id: 'geofence', code: '3.1.2', title: '航点与围栏校验', owner: '飞控工程师' }
      ]},
      { id: 'planning', code: '3.2', title: '路径规划', owner: '算法工程师', children: [
        { id: 'single-sim', code: '3.2.1', title: '单机仿真回归', owner: '算法组' },
        { id: 'multi-sim', code: '3.2.2', title: '双机冲突检查', owner: '算法组' }
      ]}
    ]},
    { id: 'hardware', code: '4', title: '无人机硬件', owner: '飞行组', children: [
      { id: 'flight-control', code: '4.2', title: '飞控部署', owner: '飞控工程师', children: [
        { id: 'params', code: '4.2.1', title: '参数备份', owner: '张晨' },
        { id: 'rtl', code: '4.2.2', title: '返航点检查', owner: '黄裕滨' }
      ]},
      { id: 'field-support', code: '4.3', title: '外场保障', owner: '机务保障', children: [
        { id: 'airframe', code: '4.3.1', title: '飞行前整机检查', owner: '刘洋' },
        { id: 'battery', code: '4.3.2', title: '电池周转登记', owner: '赵清' }
      ]}
    ]},
    { id: 'integration', code: '5', title: '软件与系统集成', owner: '集成组', children: [
      { id: 'module-test', code: '5.2', title: '模块联调', owner: '系统集成负责人', children: [
        { id: 'call-link', code: '5.2.1', title: '呼救链路联调', owner: '王子岳' },
        { id: 'drop-test', code: '5.2.2', title: '投送机构地测', owner: '刘洋' }
      ]},
      { id: 'field-test', code: '5.3', title: '实地联调', owner: '现场协调', children: [
        { id: 'full-flow', code: '5.3.1', title: '全流程联调', owner: '周敏' },
        { id: 'takeover', code: '5.3.2', title: '异常接管演练', owner: '王思上' }
      ]}
    ]},
    { id: 'closing', code: '6', title: '验收与收尾', owner: '质量组', children: [
      { id: 'archive', code: '6.1', title: '成果归档', owner: '数据记录员', children: [
        { id: 'media', code: '6.1.1', title: '视频数据归档', owner: '吴桐' },
        { id: 'issues', code: '6.1.2', title: '测试问题闭环', owner: '蔡之乐' }
      ]},
      { id: 'acceptance', code: '6.2', title: '汇报验收', owner: '项目负责人', children: [
        { id: 'rehearsal', code: '6.2.1', title: '最终演示彩排', owner: '唐可' },
        { id: 'signoff', code: '6.2.2', title: '验收清单签署', owner: '林书遥' }
      ]}
    ]}
  ]
};

const collapsedWbsNodes = new Set();
const leafStates = new Map([
  ['rtm', 'done'], ['roster', 'done'], ['inflate', 'done'], ['single-sim', 'done'],
  ['params', 'done'], ['airframe', 'done'], ['call-link', 'active'], ['drop-test', 'active'],
  ['full-flow', 'active'], ['media', 'open']
]);

function walkWbs(node, list = []) {
  list.push(node);
  (node.children || []).forEach(child => walkWbs(child, list));
  return list;
}

function renderWbsNode(node) {
  const hasChildren = Boolean(node.children?.length);
  const collapsed = collapsedWbsNodes.has(node.id);
  const state = hasChildren ? '' : (leafStates.get(node.id) || 'open');
  const stateText = { open: '待排班', active: '进行中', done: '已完成' }[state];
  return `<li class="tree-item ${collapsed ? 'collapsed' : ''}">
    <button class="wbs-node ${hasChildren ? 'parent-node' : `leaf-node ${state}`}" type="button" data-wbs-node="${node.id}" data-leaf="${hasChildren ? 'false' : 'true'}">
      <span class="node-code">${node.code}</span><strong>${node.title}</strong><small>${node.owner}</small>
      ${hasChildren ? `<i class="node-toggle">${collapsed ? '＋' : '−'}</i>` : `<i class="leaf-state">${stateText}</i>`}
    </button>
    ${hasChildren ? `<ul>${node.children.map(renderWbsNode).join('')}</ul>` : ''}
  </li>`;
}

function updateWbsSummary() {
  const leaves = walkWbs(wbsTree, []).filter(node => !node.children);
  const done = leaves.filter(node => leafStates.get(node.id) === 'done').length;
  const active = leaves.filter(node => leafStates.get(node.id) === 'active').length;
  const summary = $('#wbs-live-summary');
  if (summary) summary.innerHTML = `<b>${done}</b> 已完成　<b>${active}</b> 进行中　<b>${leaves.length - done - active}</b> 待排班`;
}

function bindWbsInteractions() {
  $$('[data-wbs-node]').forEach(button => button.addEventListener('click', () => {
    const id = button.dataset.wbsNode;
    if (button.dataset.leaf === 'true') {
      const next = { open: 'active', active: 'done', done: 'open' }[leafStates.get(id) || 'open'];
      leafStates.set(id, next);
      showToast(`工作包状态已更新为：${{ open: '待排班', active: '进行中', done: '已完成' }[next]}`);
    } else if (collapsedWbsNodes.has(id)) collapsedWbsNodes.delete(id);
    else collapsedWbsNodes.add(id);
    renderWbs();
  }));
  $('#expand-wbs').addEventListener('click', () => { collapsedWbsNodes.clear(); renderWbs(); });
  $('#focus-wbs').addEventListener('click', () => {
    collapsedWbsNodes.clear();
    walkWbs(wbsTree, []).filter(node => node.children && node !== wbsTree && !wbsTree.children.includes(node)).forEach(node => collapsedWbsNodes.add(node.id));
    renderWbs();
  });
  $('#reset-wbs').addEventListener('click', () => { leafStates.clear(); collapsedWbsNodes.clear(); renderWbs(); showToast('WBS 动态状态已重置'); });
}

function renderWbs() {
  $('#wbs-board').innerHTML = `<div class="wbs-tree-shell">
    <div class="tree-toolbar"><div><strong>动态 WBS 工作树</strong><span id="wbs-live-summary"></span></div><div><button id="focus-wbs" type="button">聚焦主干</button><button id="expand-wbs" type="button">全部展开</button><button id="reset-wbs" type="button">重置状态</button></div></div>
    <div class="tree-help"><span>点击父节点折叠分支</span><span>点击叶子节点切换执行状态</span><span>可横向滚动查看完整工作树</span></div>
    <div class="wbs-tree-viewport"><div class="wbs-tree"><ul>${renderWbsNode(wbsTree)}</ul></div></div>
  </div>`;
  updateWbsSummary();
  bindWbsInteractions();
  requestAnimationFrame(() => {
    const viewport = $('.wbs-tree-viewport');
    viewport.scrollLeft = Math.max(0, (viewport.scrollWidth - viewport.clientWidth) / 2);
  });
}

function bindDialog(dialog) {
  $('.dialog-close', dialog).addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
}
bindDialog($('#person-dialog')); bindDialog($('#baseline-dialog'));
['#open-baseline', '#open-baseline-top'].forEach(selector => $(selector).addEventListener('click', () => $('#baseline-dialog').showModal()));

$('#reset-data').addEventListener('click', () => {
  tasks = structuredClone(initialTasks); activeTaskId = null;
  renderOverview(); renderTaskList(); renderSchedule(); renderPeople();
  $('#assignment-panel').innerHTML = '<div class="assignment-placeholder"><span>+</span><h2>选择一项任务</h2><p>查看岗位需求、时间冲突并完成人员分配。</p></div>';
  showToast('演示数据已重置');
});

renderOverview(); renderPeople(); renderTaskList(); renderSchedule(); renderWbs();
const initialView = location.hash.slice(1);
if (['overview', 'people', 'allocation', 'schedule', 'wbs'].includes(initialView)) switchView(initialView);
