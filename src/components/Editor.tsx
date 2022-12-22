import { Flex, Box, Text } from '@mantine/core'
import { ComponentProps, FC } from 'react'
import RichTextEditor from 'libs/RichTextEditor'

type EditorProps = {} & ComponentProps<typeof RichTextEditor>

export const Editor: FC<EditorProps> = ({ ...editorProps }) => {
  return (
    <Flex w={'100%'} h={'100%'} gap={4}>
      <Box mt={12} sx={{ overflow: 'hidden' }}>
        {[...Array(300)].map((_, index) => (
          <Text key={index} pr={3} align="right" c={'gray.6'}>
            {index + 1}
          </Text>
        ))}
      </Box>
      <Box
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
