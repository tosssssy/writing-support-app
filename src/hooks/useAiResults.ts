import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { AiResults } from 'types/common'
import { postApi } from 'utils/apiClient'
import { sanitizeSentence } from 'utils/sentence'

export const useAiResults = (
  sentences: string[],
): [AiResults, Dispatch<SetStateAction<AiResults>>] => {
  const [aiResults, setAiResults] = useState<AiResults>([])

  useEffect(() => {
    for (const sentence of sentences) {
      if (aiResults.every(v => v.key !== sentence)) {
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
            {
              key: sentence,
              suggestions: res.choices.map(v => sanitizeSentence(v.text)),
              hidden: false,
            },
          ])
        })()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sentences])

  return [aiResults, setAiResults]
}
