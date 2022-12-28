import {
  Title,
  Divider,
  Slider,
  PasswordInput,
  Text,
  Stack,
  Box,
  Select,
  Space,
} from '@mantine/core'
import { FC, useCallback } from 'react'
import { AppConfig, useAppConfig } from 'hooks/useAppConfig'

const directions: { value: AppConfig['suggestionDirection']; label: string }[] =
  [
    { value: 'Make it a natural sentence.', label: '自然な文章にする' },
    { value: 'Fix the typo.', label: '誤字を修正する' },
    { value: 'Looking for a paraphrase.', label: '言い換えを探す' },
    {
      value: 'Make it as good as possible.',
      label: 'なるべくいい感じにする',
    },
  ]

type SettingsProps = {}

export const Settings: FC<SettingsProps> = ({}) => {
  const [config, setConfig] = useAppConfig()

  const handleChange = useCallback(
    (update: Partial<AppConfig>) => setConfig({ ...config, ...update }),
    [config, setConfig],
  )
  return (
    <Stack spacing={'xl'}>
      <Box>
        <Title size={'h3'}>AI</Title>
        <Divider my="sm" />
        <Select
          mt={'sm'}
          label="サジェストの方向性"
          description="AIにどのような方向でサジェストをしてもらうかを決めることができます。"
          value={config.suggestionDirection}
          onChange={e =>
            handleChange({
              suggestionDirection: e as AppConfig['suggestionDirection'],
            })
          }
          data={directions}
        />
        <Space h={'md'} />
        <Text size={'sm'}>感度</Text>
        <Text color={'dimmed'} size="xs">
          感度を高くするほど、独創的なサジェストになります。
        </Text>
        <Slider
          mt={'xs'}
          size={'sm'}
          marks={[
            { value: 20, label: '20%' },
            { value: 50, label: '50%' },
            { value: 80, label: '80%' },
          ]}
          value={config.suggestionSensitivity}
          onChange={e => handleChange({ suggestionSensitivity: e })}
        />
        <Space h={'sm'} />
      </Box>
      <Box>
        <Title size={'h3'}>API</Title>
        <Divider my="sm" />
        <PasswordInput
          label="API キー"
          description="呼び出し上限があるため、個人でAPIキーを設定すると安定してアプリを使用できます。"
          placeholder="c8355hv47v5yt3hg"
          value={config.apiKey}
          onChange={e => handleChange({ apiKey: e.target.value })}
        />
      </Box>
    </Stack>
  )
}
