import { Flex, Box, Text } from '@mantine/core'
import { useResizeObserver } from '@mantine/hooks'
import { ComponentProps, FC } from 'react'
import RichTextEditor from 'libs/RichTextEditor'

type EditorProps = {} & ComponentProps<typeof RichTextEditor>

export const Editor: FC<EditorProps> = ({ ...editorProps }) => {
  const [ref, { height }] = useResizeObserver()
  return (
    <Flex w={'100%'} h={'100%'} gap={4} sx={{ overflowY: 'hidden' }}>
      <Box mt={12} w={30} pos="relative">
        {[...Array(~~(height / 24.8))].map((_, index) => (
          <Text
            key={index}
            pr={3}
            w={30}
            align="right"
            c={'gray.6'}
            pos="absolute"
            top={index * 24.8}
          >
            {index + 1}
          </Text>
        ))}
      </Box>
      <Box
        ref={ref}
        sx={{
          width: '100%',
          wordWrap: 'break-word',
          p: { margin: '0 !important', fontSize: 16, lineHeight: 1.55 },
        }}
      >
        <RichTextEditor
          {...editorProps}
          sx={{ height: '100%' }}
          styles={{ toolbar: { display: 'none' } }}
          controls={[]}
        />
      </Box>
    </Flex>
  )
}
