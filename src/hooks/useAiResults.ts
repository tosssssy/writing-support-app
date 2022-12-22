import { useEffect, useState } from 'react'
import { AiResults } from 'types/common'
import { postApi } from 'utils/apiClient'

export const useAiResults = (sentences: string[]): AiResults => {
  const [aiResults, setAiResults] = useState<AiResults>([])

  useEffect(() => {
    for (const sentence of sentences) {
      if (aiResults.every(v => v.key !== sentence)) {
        console.log('fetch!' + sentence)
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sentences])

  return aiResults
}
