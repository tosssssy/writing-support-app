export type EditsRequest = {
  model: 'text-davinci-edit-001'
  input: string
  instruction: string
  temperature?: number
  n?: number
}

export type EditsResponse = {
  object: 'edit'
  created: number
  choices: Array<
    | {
        text: string
        index: number
      }
    | {
        error: {
          message: string
          type: string
        }
      }
  >

  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}
