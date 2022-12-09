import { HttpMethod } from 'utils/apiClient'

type Schema<
  T extends Record<
    HttpMethod,
    { [url: string]: [object | undefined, object | undefined] }
  >,
> = T

export type Api = Schema<{
  // メソッド名: {
  //   url: [リクエストの型、レスポンスの型]
  // }
  GET: {
    '/proofreading/v2/typo': [
      {
        apikey: string
        sentence: string
        sensitivity?: 'low' | 'medium' | 'high'
      },
      {
        resultID: string
        status: number
        message: string
        inputSentence: string
        normalizedSentence: string
        checkedSentence: string
        alerts: {
          pos: number
          word: string
          score: number
          suggestions: string[]
        }[]
      },
    ]
  }
  POST: {}
  PUT: {}
  DELETE: {}
}>
