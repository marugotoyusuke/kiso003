'use strict';
let count = 0;
function change(action) {
  if (action === 'A') count++;
  if (action === 'B') count--;
  if (action === 'C') count = 0;
  document.querySelector('#counter').textContent = count;
  const process = {A:'値に1を足す',B:'値から1を引く',C:'値を0にする'}[action];
  document.querySelector('#signal').textContent = `入力：${action}を押した → 処理：${process} → 出力：${count}を表示`;
}
document.querySelector('#plus').addEventListener('click',()=>change('A'));
document.querySelector('#minus').addEventListener('click',()=>change('B'));
document.querySelector('#reset-counter').addEventListener('click',()=>change('C'));
