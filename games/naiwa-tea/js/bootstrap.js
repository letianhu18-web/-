(() => {
  const loading = document.getElementById('loading');
  const message = document.getElementById('load-percent');
  let ready = false;
  window.addEventListener('naiwa:ready', () => { ready = true; clearTimeout(timer); }, {once: true});
  function fail() {
    if (ready) return;
    clearTimeout(timer);
    loading.hidden = false;
    loading.replaceChildren();
    const heading = document.createElement('b');
    heading.textContent = '小店准备遇到了一点问题';
    const hint = document.createElement('small');
    hint.textContent = navigator.onLine ? '请重新加载，或换一个支持 3D 的浏览器试试' : '网络断开了，连接后再试一次';
    const retry = document.createElement('button');
    retry.className = 'secondary'; retry.textContent = '重新加载小店';
    retry.onclick = () => location.reload();
    loading.append(heading, hint, retry);
    document.getElementById('main-action').disabled = true;
  }
  const timer = setTimeout(() => {
    if (ready || loading.hidden) return;
    message.textContent = '首次准备可能慢一些，再等一会儿…';
    const retry = document.createElement('button');
    retry.className = 'secondary'; retry.textContent = '重新加载';
    retry.onclick = () => location.reload();
    loading.append(retry);
  }, 25000);
  import('./app.mjs?v=0.7.9').catch(error => { console.error('Game startup failed', error); fail(); });
})();

