const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
$$('.reveal').forEach((item) => revealObserver.observe(item));

const menuButton = $('.menu-button');
const nav = $('nav');
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
$$('nav a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

$$('.algo-step').forEach((step) => step.addEventListener('click', () => {
  $$('.algo-step').forEach((item) => item.classList.remove('active'));
  step.classList.add('active');
  $('.algorithm-visual').dataset.stage = step.dataset.step;
}));

const simulationContent = {
  single: {
    twoD: 'simulation_2d.gif',
    threeD: 'simulation_3d.gif',
    alt2: '单机二维路径规划仿真',
    alt3: '单机三维路径规划仿真',
    note: '单机规划展示航迹如何避开障碍与高风险区域，并保持连续、可执行的转向。'
  },
  multi: {
    twoD: 'multi_simulation_2d.gif',
    threeD: 'multi_simulation_3d.gif',
    alt2: '双无人机二维协同路径规划仿真',
    alt3: '双无人机三维协同路径规划仿真',
    note: '双机协同采用 FCFS 顺序规划，后规划无人机读取已累积的时变风险，主动降低航迹冲突。'
  }
};

$$('[data-sim]').forEach((button) => button.addEventListener('click', () => {
  const data = simulationContent[button.dataset.sim];
  $$('[data-sim]').forEach((item) => item.classList.remove('active'));
  button.classList.add('active');
  const sim2d = $('#sim-2d');
  const sim3d = $('#sim-3d');
  sim2d.src = data.twoD;
  sim3d.src = data.threeD;
  sim2d.alt = data.alt2;
  sim3d.alt = data.alt3;
  $('#sim-note').textContent = data.note;
}));

function bindDialog(dialog) {
  $('button', dialog).addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
}

const specModal = $('#spec-modal');
bindDialog(specModal);
$('[data-modal-open="spec-modal"]').addEventListener('click', () => specModal.showModal());

const screenModal = $('#screen-modal');
bindDialog(screenModal);
$$('[data-screen]').forEach((button) => button.addEventListener('click', () => {
  const image = $('img', screenModal);
  image.src = button.dataset.screen;
  image.alt = `${button.textContent}视觉稿`;
  screenModal.showModal();
}));

$$('[data-tab]').forEach((tab) => tab.addEventListener('click', () => {
  $$('[data-tab]').forEach((item) => item.classList.remove('active'));
  $$('.phone-pane').forEach((pane) => pane.classList.remove('active'));
  tab.classList.add('active');
  $(`[data-pane="${tab.dataset.tab}"]`).classList.add('active');
}));

const sosButton = $('#sos-button');
const resetButton = $('#reset-button');
const locateButton = $('#locate-button');
const drone = $('#drone-dot');
const statusDot = $('.status-dot');
const statusTitle = $('#dispatch-status b');
const statusSub = $('#dispatch-status small');
const eta = $('#eta');
const mapTip = $('#map-tip');
let dispatchTimers = [];
let countdownTimer = null;

function clearDispatchTimers() {
  dispatchTimers.forEach(clearTimeout);
  dispatchTimers = [];
  clearInterval(countdownTimer);
}

function setDispatchStatus(title, sub, tip, remaining) {
  statusTitle.textContent = title;
  statusSub.textContent = sub;
  mapTip.textContent = tip;
  if (remaining !== undefined) eta.textContent = remaining;
}

function beginCountdown(seconds) {
  let remaining = seconds;
  const update = () => {
    const minutes = String(Math.floor(remaining / 60)).padStart(2, '0');
    const secs = String(remaining % 60).padStart(2, '0');
    eta.textContent = `${minutes}:${secs}`;
    remaining = Math.max(0, remaining - 1);
  };
  update();
  countdownTimer = setInterval(update, 1000);
}

function startDispatch() {
  clearDispatchTimers();
  sosButton.disabled = true;
  sosButton.querySelector('span').textContent = '任务已创建';
  sosButton.querySelector('small').textContent = '正在匹配最近的无人机';
  resetButton.hidden = true;
  statusDot.classList.add('live');
  drone.style.opacity = '1';
  setDispatchStatus('正在确认任务', '已同步位置与现场信息', '任务已创建 · 调度中心处理中', '02:36');
  beginCountdown(156);

  dispatchTimers.push(setTimeout(() => {
    setDispatchStatus('无人机已起飞', '基地距离呼救点 1.8 km', '飞行中 · 预计 2 分钟抵达');
    drone.style.left = '104px';
    drone.style.top = '138px';
  }, 1800));

  dispatchTimers.push(setTimeout(() => {
    setDispatchStatus('正在前往现场', '航迹正常 · 电量 86%', '无人机已完成 52% 航程');
    drone.style.left = '172px';
    drone.style.top = '225px';
  }, 4200));

  dispatchTimers.push(setTimeout(() => {
    setDispatchStatus('即将抵达', '请留意上空并保持投送区净空', '距离呼救点约 80 米');
    drone.style.left = '245px';
    drone.style.top = '285px';
  }, 6800));

  dispatchTimers.push(setTimeout(() => {
    clearInterval(countdownTimer);
    setDispatchStatus('AED 已抵达', '请按教学指引开展现场急救', '投送完成 · 现场人员请立即取用', '00:00');
    statusDot.classList.remove('live');
    sosButton.querySelector('span').textContent = '投送完成';
    sosButton.querySelector('small').textContent = '请同步拨打 120 并实施急救';
    resetButton.hidden = false;
  }, 9400));
}

function resetDispatch() {
  clearDispatchTimers();
  sosButton.disabled = false;
  sosButton.querySelector('span').textContent = '一键呼救';
  sosButton.querySelector('small').textContent = '调度无人机投送 AED';
  resetButton.hidden = true;
  statusDot.classList.remove('live');
  drone.removeAttribute('style');
  setDispatchStatus('救援服务待命', '紧急情况请优先拨打 120', '高精度定位已启用', '--:--');
}

sosButton.addEventListener('click', startDispatch);
resetButton.addEventListener('click', resetDispatch);
locateButton.addEventListener('click', () => {
  mapTip.textContent = '正在刷新定位…';
  setTimeout(() => { mapTip.textContent = '定位完成 · 精度约 8 米'; }, 700);
});
