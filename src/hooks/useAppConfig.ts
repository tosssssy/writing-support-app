import { useLocalStorage } from '@mantine/hooks'

export type AppConfig = {
  suggestionDirection:
    | 'Fix the typo.'
    | 'Make it a natural sentence.'
    | 'Looking for a paraphrase.'
    | 'Make it as good as possible.'
  suggestionSensitivity: number
  apiKey: string | undefined
}

export const useAppConfig = () =>
  useLocalStorage<AppConfig>({
    key: 'app-config',
    defaultValue: {
      suggestionDirection: 'Make it a natural sentence.',
      suggestionSensitivity: 60,
      apiKey: undefined,
    },
  })
