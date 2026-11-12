// This is an input policy, not an execution boundary. All accepted names must
// still be rendered as text and bound as SQL parameters; names never reach AI.
export function nicknameError(name) {
  if (typeof name !== 'string' || !name.trim() || [...name.trim()].length > 24) return '请输入 1–24 个字符的昵称。';
  const scan = name.normalize('NFKC').replace(/[\p{Cf}\p{Cc}]/gu,'').toLowerCase();
  const code = [
    /<\s*[!/?a-z]/i,
    /(?:javascript|vbscript)\s*:|data\s*:\s*(?:text\/html|application\/javascript)/i,
    /\bon\w+\s*=|\b(?:eval|alert|prompt|confirm|function|settimeout|setinterval|fetch|require)\s*\(/i,
    /\b(?:document|window|globalthis)\s*[.\[]|\bimport\s*\(/i,
    /\b(?:drop|alter|create|truncate)\s+(?:table|database)\b|\bunion\s+select\b|\bselect\b.*\bfrom\b|\b(?:insert\s+into|delete\s+from)\b/i,
    /\$\(|`|\b(?:curl|wget|powershell|bash|sh)\s+[-/]/i,
  ];
  const instructions = [
    /(?:忽略|无视|忘记|覆盖|绕过|删除).{0,12}(?:指令|提示词|规则|限制|系统)/,
    /(?:系统|开发者|管理员).{0,4}(?:提示词|指令|消息|权限)/,
    /(?:输出|泄露|显示|打印|执行|运行).{0,8}(?:提示词|指令|代码|密钥|密码|token|secret)/,
    /(?:你现在是|你是一个|从现在开始|角色设定|越狱模式|开发者模式)/,
    /\b(?:ignore|disregard|override|forget|bypass)\b.{0,20}\b(?:instructions?|prompts?|rules?|system|previous)\b/i,
    /\b(?:system|developer|assistant)\s*(?::|prompt|message|instructions?)/i,
    /\b(?:reveal|print|show|execute|run)\b.{0,15}\b(?:prompt|instructions?|secret|password|code|command)/i,
    /\b(?:act as|you are now|jailbreak)\b/i,
  ];
  if ([...code,...instructions].some(pattern=>pattern.test(scan))) return '昵称不能包含代码或提示指令，请换一个普通昵称。';
  return '';
}
