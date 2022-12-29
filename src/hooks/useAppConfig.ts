import { atom, useAtom } from 'jotai'

export type AppConfig = {
  suggestionDirection:
    | 'Fix the typo.'
    | 'Make it a natural sentence.'
    | 'Looking for a paraphrase.'
    | 'Make it as good as possible.'
  suggestionSensitivity: number
  apiKey: string | undefined
}

const configAtom = atom<AppConfig>({
  suggestionDirection: 'Make it a natural sentence.',
  suggestionSensitivity: 60,
  apiKey: undefined,
})

export const useAppConfig = () => useAtom(configAtom)
