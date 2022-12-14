import { useEffect, useMemo, useState } from 'react'
import { postApi } from 'utils/apiClient'

type AiResults = Array<{
  key: string
  suggestions: string[]
}>

export const useAiResults = (richText: string): AiResults => {
  const [aiResults, setAiResults] = useState<AiResults>([])

  const sentences = useMemo(
    () =>
      richText
        .replaceAll('<p>', '')
        .replaceAll('</p>', '')
        .replaceAll('<br>', '')
        .split('。')
        .slice(0, -1),
    [richText],
  )

  useEffect(() => {
    for (const sentence of sentences) {
      if (!aiResults.every(v => v.key !== sentence)) {
        return
      }

      ;(async () => {
        const res = await postApi('/v1/edits', {
          model: 'text-davinci-edit-001',
          input: sentence,
          instruction: 'Fix mistakes',
          temperature: 0.5,
          n: 3,
        })
        setAiResults(v => [
          ...v,
          { key: sentence, suggestions: res.choices.map(v => v.text) },
        ])
      })()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sentences])

  return aiResults
}
