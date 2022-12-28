import { Flex, Text } from '@mantine/core'
import { useTextSelection } from '@mantine/hooks'
import { FC } from 'react'
import { calcStringLengthFromRichText } from 'utils/sentence'

type CounterProps = {
  richText: string
}

export const Counter: FC<CounterProps> = ({ richText }) => {
  const selection = useTextSelection()
  return (
    <Flex gap={'xl'}>
      {/* hydration error回避のためにSSR時には初期テキストの文字数を渡している */}
      <Text size="sm">
        文字数：{calcStringLengthFromRichText(richText) || 4}
      </Text>

      <Text
        size="sm"
        sx={{
          transition: '0.2s',
          opacity: selection && selection?.toString().length > 0 ? 1 : 0,
          visibility:
            selection && selection?.toString().length > 0
              ? 'visible'
              : 'hidden',
        }}
      >
        囲っている文字数：{selection?.toString().length}
      </Text>
    </Flex>
  )
}
