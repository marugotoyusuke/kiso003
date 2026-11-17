'use strict';
const byId = id => document.getElementById(id);
let active = [...QUESTIONS];
let graded = false;
let missed = [];
let baseTopic = 'all';
const topic = byId('topic');
const requested = new URLSearchParams(window.location.search).get('topic');
if (Object.hasOwn(TOPICS, requested)) { topic.value = requested; baseTopic = requested; }
function element(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}
function selected(q) { return document.querySelector(`input[name="q${q.id}"]:checked`); }
function updateProgress() {
  const n = active.filter(q => selected(q)).length;
  byId('progress-label').textContent = `${n} / ${active.length}問 回答済み`;
  byId('progress-fill').style.width = `${active.length ? 100 * n / active.length : 0}%`;
  const bar = document.querySelector('[role=progressbar]');
  bar.setAttribute('aria-valuemax', active.length);
  bar.setAttribute('aria-valuenow', n);
}
function render(list) {
  active = [...list]; graded = false; missed = [];
  byId('result').hidden = true;
  byId('result').replaceChildren();
  byId('grade').disabled = false;
  byId('submit-hint').textContent = '未回答の問題は0点になります。';
  const area = byId('questions'); area.replaceChildren();
  for (const q of active) {
    const field = element('fieldset', 'question'); field.id = `question-${q.id}`;
    const legend = element('legend');
    const meta = element('span', 'q-meta');
    meta.append(element('span', 'q-number', `Q${String(q.id).padStart(2,'0')}`), element('span','',TOPICS[q.topic]));
    legend.append(meta, document.createTextNode(q.q)); field.append(legend);
    const options = element('div', 'options');
    q.choices.forEach((choice, i) => {
      const label = element('label','option');
      const input = document.createElement('input'); input.type = 'radio'; input.name = `q${q.id}`; input.value = i;
      input.addEventListener('change',updateProgress);
      label.append(input,element('span','',`${['ア','イ','ウ','エ'][i]}．${choice}`)); options.append(label);
    }); field.append(options); area.append(field);
  }
  updateProgress();
}
function grade(event) {
  event.preventDefault(); if (graded) return; graded = true;
  const stats = {}; let correct = 0; missed = [];
  active.forEach(q => {
    if (!stats[q.topic]) stats[q.topic] = {total:0,correct:0};
    stats[q.topic].total++;
    const input = selected(q); const choice = input ? Number(input.value) : -1;
    const ok = choice === q.answer;
    if (ok) {correct++;stats[q.topic].correct++;} else {missed.push(q);}
    const field = byId(`question-${q.id}`);
    const labels = field.querySelectorAll('.option');
    labels[q.answer].classList.add('good');
    if (!ok && choice !== -1) labels[choice].classList.add('bad');
    field.querySelectorAll('input').forEach(i => {i.disabled = true;});
    const exp = element('div','explanation');
    exp.append(element('strong',ok ? 'status-good':'status-bad',ok ? '○ 正解':choice === -1?'− 未回答':'× 不正解'));
    exp.append(element('p','',`正解：${['ア','イ','ウ','エ'][q.answer]}．${q.choices[q.answer]}`),element('p','',q.why));
    const link = element('a','', 'このテーマの解説を読む →'); link.href = `index.html#${q.topic}`; exp.append(link); field.append(exp);
  });
  const result = byId('result'); result.replaceChildren(); result.hidden = false;
  result.append(element('div','small','RESULT'),element('h2','',correct === active.length ? '全問正解！ 理由も説明できる？' : '解説を読んで、理解をもう一歩。'));
  result.firstChild.style.color = '#d4e9dd';
  const score = element('div','score',`${correct} / ${active.length}`); result.append(score);
  result.append(element('p','result-note',`正答率 ${Math.round(correct / active.length * 100)}% ／ 選択問題のみ・各1点。${active.length === QUESTIONS.length ? '全24問の結果です。':'選択した問題だけの結果です。'}`));
  const table = element('table','result-table');
  const head = document.createElement('thead'); const hr = document.createElement('tr');
  ['テーマ','正解 / 出題数'].forEach(t=>hr.append(element('th','',t))); head.append(hr);table.append(head);
  const body = document.createElement('tbody');
  Object.entries(stats).forEach(([key,stat])=>{const row=document.createElement('tr');row.append(element('td','',TOPICS[key]),element('td','',`${stat.correct} / ${stat.total}`));body.append(row);});table.append(body);result.append(table);
  const actions = element('div','actions');
  if (missed.length) {
    const retry = element('button','btn',`間違い・未回答の${missed.length}問を復習 →`); retry.type='button';
    retry.addEventListener('click',()=>{const retryList=[...missed];render(retryList);topic.value=baseTopic;focusQuestions();}); actions.append(retry);
  }
  const again = element('button','btn secondary',baseTopic === 'all'?'全24問をもう一度':'このテーマをもう一度'); again.type='button';
  again.addEventListener('click',()=>{render(baseTopic === 'all'?QUESTIONS:QUESTIONS.filter(q=>q.topic===baseTopic));focusQuestions();});actions.append(again);
  result.append(actions,element('p','result-note','各問題の下に、正解・理由・解説ページへのリンクを表示しました。'));
  byId('grade').disabled = true;byId('submit-hint').textContent='回答を確定しました。上のボタンから再挑戦できます。';
  result.focus();result.scrollIntoView({block:'start',behavior:'smooth'});
}
function focusQuestions() { const first=byId('questions').querySelector('input'); if(first)first.focus(); }
topic.addEventListener('change',()=>{baseTopic=topic.value;render(baseTopic==='all'?QUESTIONS:QUESTIONS.filter(q=>q.topic===baseTopic));});
byId('quiz-form').addEventListener('submit',grade);
WRITTEN.forEach((q,i)=>{
  const card = element('article','card');
  const title = element('h3','',`記述 ${i+1}｜${q.q}`); title.id=`written-title-${i}`;card.append(title);
  const area=document.createElement('textarea');area.setAttribute('aria-labelledby',title.id);area.placeholder='自分の考えを書いてみよう（保存されません）';card.append(area);
  const detail=document.createElement('details');detail.append(element('summary','','解答例・確認ポイントを見る'),element('p','',q.model));
  detail.append(element('strong','','確認ポイント'),element('p','',q.points));card.append(detail);byId('written-list').append(card);
});
byId('quiz-app').hidden=false;
render(baseTopic==='all'?QUESTIONS:QUESTIONS.filter(q=>q.topic===baseTopic));
