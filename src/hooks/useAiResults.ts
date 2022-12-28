import { useDebouncedValue } from '@mantine/hooks'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useAppConfig } from 'hooks/useAppConfig'
import { AiResults } from 'types/common'
import { postApi } from 'utils/apiClient'
import { sanitizeSentence } from 'utils/sentence'

export const useAiResults = (
  sentences: string[],
): [AiResults, Dispatch<SetStateAction<AiResults>>] => {
  const [config] = useAppConfig()

  const [aiResults, setAiResults] = useState<AiResults>([])
  const [debouncedSentences] = useDebouncedValue(sentences, 400)

  useEffect(() => {
    for (const sentence of debouncedSentences) {
      if (aiResults.every(v => v.key !== sentence)) {
        // fetchする前にsuggestionsを[]でセットする
        setAiResults(v => [
          ...v,
          {
            key: sentence,
            suggestions: [],
            hidden: false,
          },
        ])

        // fetchした後にsuggestionsを更新する
        ;(async () => {
          const res = await postApi('/v1/edits', {
            model: 'text-davinci-edit-001',
            input: sentence,
            instruction: config.suggestionDirection,
            temperature: config.suggestionSensitivity / 100,
            n: 3,
          })
          setAiResults(result =>
            result.map(v =>
              v.key === sentence
                ? {
                    ...v,
                    suggestions: res.choices.map(v =>
                      Object.hasOwn(v, 'text')
                        ? sanitizeSentence((v as { text: string }).text)
                        : 'suggest error',
                    ),
                  }
                : v,
            ),
          )
        })()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSentences])

  return [aiResults, setAiResults]
}
