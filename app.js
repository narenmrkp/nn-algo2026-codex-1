const rows = [
  ['RELIANCE', 'NSE', '2,982.40', '+1.84%', '8.42L', 'EMA CROSS', 'bullish', 5],
  ['ICICIBANK', 'NSE', '1,287.65', '+1.37%', '12.18L', 'EMA CROSS', 'bullish', 5],
  ['TATAMOTORS', 'NSE', '1,096.20', '+2.16%', '19.03L', 'VOLUME SPIKE', 'bullish', 4],
  ['SUNPHARMA', 'NSE', '1,843.75', '+0.92%', '4.76L', 'RSI RECOVERY', 'bullish', 4],
  ['HDFCBANK', 'NSE', '1,748.10', '+0.58%', '10.25L', 'EMA CROSS', 'bullish', 3],
  ['INFY', 'NSE', '1,921.35', '−0.14%', '6.81L', 'WATCH', 'watch', 2],
  ['MARUTI', 'NSE', '13,048.00', '+0.38%', '1.27L', 'BREAKOUT', 'bullish', 4],
  ['SBIN', 'NSE', '824.10', '+1.04%', '21.82L', 'VOLUME SPIKE', 'bullish', 3],
  ['TCS', 'NSE', '4,143.50', '−0.29%', '2.03L', 'WATCH', 'watch', 2],
  ['BHARTIARTL', 'NSE', '1,668.35', '+0.72%', '3.62L', 'EMA CROSS', 'bullish', 3],
  ['AXISBANK', 'NSE', '1,193.10', '+0.41%', '8.19L', 'WATCH', 'watch', 2],
  ['LT', 'NSE', '3,715.45', '+1.12%', '1.91L', 'BREAKOUT', 'bullish', 4]
];
const body = document.querySelector('#results-body');
let currentRows = rows;
function render(data) {
  body.innerHTML = data.map(([name, exchange, price, change, volume, signal, type, level]) => `<tr><td class="symbol"><strong>${name}</strong><small>${exchange}</small></td><td class="price">₹ ${price}</td><td class="change ${change.startsWith('+') ? 'positive' : 'negative'}">${change}</td><td class="volume">${volume}</td><td><span class="signal ${type}">${signal}</span></td><td><span class="strength">${[1,2,3,4,5].map(n=>`<i class="${n<=level?'on':''}"></i>`).join('')}</span></td><td><button class="trade" data-symbol="${name}" data-price="${price}">Trade</button></td></tr>`).join('');
  document.querySelector('#result-total').textContent = data.length;
}
render(rows);
const dialog = document.querySelector('#connect-dialog');
document.querySelectorAll('#connect-button,#open-connect').forEach(b => b.addEventListener('click', () => dialog.showModal()));
document.querySelector('#connect-form').addEventListener('submit', e => { if (e.submitter?.value === 'connect') { document.querySelector('#account-name').textContent = 'Shoonya · Connected'; document.querySelector('.status-dot').style.background = '#20a67a'; toast('Shoonya account connected successfully'); } });
const tradeDialog = document.querySelector('#trade-dialog');
body.addEventListener('click', e => { const b=e.target.closest('.trade'); if(!b) return; document.querySelector('#trade-title').textContent=`Buy ${b.dataset.symbol}`; document.querySelector('#trade-price').textContent=`₹ ${b.dataset.price}`; tradeDialog.showModal(); });
document.querySelector('#trade-form').addEventListener('submit', e => { if(e.submitter?.value==='place'){ document.querySelector('#order-count').textContent = +document.querySelector('#order-count').textContent + 1; toast(`Order sent for ${document.querySelector('#trade-title').textContent.replace('Buy ','')}`); } });
document.querySelectorAll('.tool').forEach(button => button.addEventListener('click', () => { document.querySelectorAll('.tool').forEach(x=>x.classList.remove('active'));button.classList.add('active'); currentRows=button.dataset.filter==='all'?rows:rows.filter(r=>r[6]===button.dataset.filter);render(currentRows); }));
document.querySelector('#run-scan').addEventListener('click', () => { const signal=document.querySelector('#signal').value; document.querySelector('#rule-text').textContent = signal === 'RSI oversold' ? 'RSI crosses above 30 · Relative volume ≥ 1.2×' : signal === 'Volume breakout' ? 'Volume ≥ 2× average · Price breaks 20-day high' : 'Price crosses above 20 EMA · Volume ≥ 1.5× average'; document.querySelector('#scan-subtitle').textContent='Just updated · Signals ranked by strength'; toast('Scan completed across NSE universe'); });
document.querySelector('#reset-scan').addEventListener('click',()=>{ document.querySelectorAll('.filters select').forEach(s=>s.selectedIndex=0);toast('Scan conditions reset'); });
document.querySelector('#export-results').addEventListener('click',()=>{ const csv=['Symbol,Price,Change,Signal',...currentRows.map(r=>`${r[0]},${r[2]},${r[3]},${r[5]}`)].join('\n');const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));a.download='signaldesk-scan.csv';a.click();toast('Scan results exported'); });
document.querySelectorAll('.side-toggle button').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.side-toggle button').forEach(x=>x.classList.remove('active'));b.classList.add('active');document.querySelector('#trade-title').textContent=document.querySelector('#trade-title').textContent.replace(/^(Buy|Sell)/, b.classList.contains('buy-side')?'Buy':'Sell');}));
function toast(message){const t=document.querySelector('#toast');t.textContent=message;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2600)}
setInterval(()=>{const d=new Date();document.querySelector('#clock').textContent=d.toLocaleTimeString('en-GB',{timeZone:'Asia/Kolkata',hour12:false})},1000);
