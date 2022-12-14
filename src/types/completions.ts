export type CompletionsRequest = {
  model: 'text-davinci-003'
  prompt: string
  temperature?: number
  top_p?: number
  n?: number
}

export type CompletionsResponse = {
  object: 'text_completion'
  created: number
  choices: [
    {
      text: string
      index: number
      finish_reason: string
    },
  ]
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}
