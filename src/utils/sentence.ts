// 例
// <p>こんにちは。</p><p>私の名前は太郎です。</p><p><br/></p><p>今日は</p>
// ↓
// ["こんにちは。","私の名前は太郎です。"]
export const toSentences = (richText: string): string[] => {
  if (typeof window !== 'object') {
    return []
  }

  const div = window.document.createElement('div')
  div.innerHTML = richText
  return div.innerText
    .split('。')
    .slice(0, -1)
    .map(v => v + '。')
}

// 不自然なスペースと「。」を取り除き、「。」で終わる文章にする。
export const sanitizeSentence = (sentence: string): string =>
  sentence.trim().replaceAll('。', '') + '。'

// richTextから文字数をカウントすする
export const calcStringLength = (richText: string): number => {
  if (typeof window !== 'object') {
    return 0
  }

  const div = window.document.createElement('div')
  div.innerHTML = richText
  return div.innerText.length
}
