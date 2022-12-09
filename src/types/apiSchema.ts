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
  GET: {}
  POST: {
    '/v1/edits': [
      {
        model: 'text-davinci-edit-001'
        input: string
        instruction: 'Fix the spelling mistakes'
        n?: number
      },
      {
        object: 'edit'
        created: number
        choices: [
          {
            text: string
            index: number
          },
        ]
        usage: {
          prompt_tokens: number
          completion_tokens: number
          total_tokens: number
        }
      },
    ]
  }
  PUT: {}
  DELETE: {}
}>
