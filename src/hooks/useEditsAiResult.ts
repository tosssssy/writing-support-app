import { useEffect, useMemo, useState } from 'react'
import { postApi } from 'utils/apiClient'

export const useEditsAiResult = (value: string) => {
  const sentences = useMemo(
    () =>
      value
        .replaceAll('<p>', '')
        .replaceAll('</p>', '')
        .replaceAll('<br>', '')
        .split('。')
        .slice(0, -1),
    [value],
  )
  const [aiResult, setAiResult] = useState<
    { key: string; suggestions: string[] }[]
  >([])

  useEffect(() => {
    for (const sentence of sentences) {
      if (!aiResult.every(v => v.key !== sentence)) {
        return
      }

      ;(async () => {
        const res = await postApi('/v1/edits', {
          model: 'text-davinci-edit-001',
          input: sentence,
          instruction: 'Please make it better worded.',
          n: 3,
        })
        setAiResult(v => [
          ...v,
          { key: sentence, suggestions: res.choices.map(v => v.text) },
        ])
      })()
    }
  }, [aiResult, sentences])

  return { aiResult }
}
