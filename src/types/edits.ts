export type EditsRequest = {
  model: 'text-davinci-edit-001'
  input: string
  instruction: string
  n?: number
}

export type EditsResponse = {
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
}
