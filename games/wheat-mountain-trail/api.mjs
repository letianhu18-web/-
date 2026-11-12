const unavailable = '排行榜暂时无法连接，本局记录和昵称已保留，请稍后重试。';
export class RankingConnectionError extends Error {
  constructor(message,{status=0,retryable=false}={}) { super(message);this.name='RankingConnectionError';this.status=status;this.retryable=retryable; }
}
function responseError(response) {
  if (response.status === 401 || response.status === 403) return new RankingConnectionError('排行榜请求被访问验证拦截，请在系统浏览器打开游戏后重试。',{status:response.status});
  if (response.status === 429) return new RankingConnectionError('请求较多，请稍后再试。',{status:429});
  if (response.redirected) return new RankingConnectionError('排行榜连接跳转到了其他页面，请重新打开游戏页面后重试。',{status:response.status});
  return new RankingConnectionError(response.status >= 500 ? unavailable : '排行榜暂未返回有效数据，本局记录和昵称已保留，请稍后重试。',{status:response.status,retryable:response.status >= 500 || response.ok});
}
export async function requestJSON(path,options={}, {fetchImpl=globalThis.fetch,baseURL=import.meta.url,validate=()=>true}={}) {
  // Resolve against the game's module, not an embedded browser's document URL.
  const endpoint = new URL(path,baseURL),method = (options.method || 'GET').toUpperCase();
  const maxAttempts = method === 'GET' ? 2 : 1;
  for (let attempt=0;attempt<maxAttempts;attempt++) {
    const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),20000);
    try {
      const headers=new Headers(options.headers);headers.set('Accept','application/json');
      const response=await fetchImpl(endpoint,{...options,method,headers,credentials:'same-origin',cache:'no-store',signal:controller.signal});
      const type=response.headers.get('content-type') || '';
      if (!/^application\/(?:[\w.-]+\+)?json(?:\s*;|$)/i.test(type)) throw responseError(response);
      let data;
      try { data=await response.json(); } catch { throw responseError(response); }
      if (!response.ok) {
        const message=typeof data?.error==='string'&&data.error.length<=200&&!/<(?:!doctype|html|body)\b/i.test(data.error)?data.error:null;
        if (message) throw new RankingConnectionError(message,{status:response.status,retryable:response.status>=500});
        throw responseError(response);
      }
      if (!data || typeof data!=='object' || Array.isArray(data) || !validate(data)) throw responseError(response);
      return data;
    } catch(error) {
      const friendly=error instanceof RankingConnectionError ? error : new RankingConnectionError(error.name==='AbortError'?'排行榜连接超时，本局记录和昵称已保留，请重试。':unavailable,{retryable:true});
      if (attempt+1>=maxAttempts || !friendly.retryable) throw friendly;
    } finally { clearTimeout(timer); }
  }
}
