import { useDebouncedValue } from '@mantine/hooks'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useAppConfig } from 'hooks/useAppConfig'
import { AiResults } from 'types/common'
import { EditsRequest, EditsResponse } from 'types/edits'
import { ApiResponseError, postApi } from 'utils/apiClient'
import { isEmptyObj } from 'utils/isEmptyObj'
import { sanitizeSentence } from 'utils/sentence'

// apiKeyがあったら直接fetch、なかったらapi routesを通してfetch
const fetchEdits = async (apiKey: string | undefined, body: EditsRequest) => {
  let result: EditsResponse
  if (apiKey) {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/v1/edits', {
      method: 'POST',
      body: isEmptyObj(body) ? null : JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
    })
    result = await res.json()
  } else {
    result = await postApi('/api/edits', body)
  }
  return result
}
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
          try {
            const res = await fetchEdits(config.apiKey, {
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
          } catch (error) {
            if (error instanceof ApiResponseError) {
              console.error(error)
            }
          }
        })()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSentences])

  return [aiResults, setAiResults]
}
