import { Box, Flex, Text } from '@mantine/core'
import { useState } from 'react'
import { useEditsAiResult } from 'hooks/useEditsAiResult'
import RichTextEditor from 'libs/RichTextEditor'

const content = '<p>こんにちは</p>'

export default function Home() {
  // const editorRef = useRef<Editor>(null)
  const [value, setValue] = useState(content)
  const { aiResult } = useEditsAiResult(value)

  return (
    <main>
      <br />
      {JSON.stringify(value)}
      <br />
      <br />
      <br />
      {JSON.stringify(aiResult)}
      <Flex gap={15} m={100}>
        <Box mt={6.5} sx={{ height: 700, overflow: 'hidden' }}>
          {[...Array(300)].map((_, index) => (
            <Text key={index} align="right" c={'gray.6'}>
              {index + 1}
            </Text>
          ))}
        </Box>
        <Box
          // ref={ref}
          sx={{
            width: 400,
            wordWrap: 'break-word',
            p: { margin: '0 !important', fontSize: 16, lineHeight: 1.55 },
          }}
        >
          <RichTextEditor
            // ref={editorRef}
            value={value}
            onChange={setValue}
            sx={{
              minHeight: 500,
              height: '100%',
            }}
            styles={{ toolbar: { padding: 0 } }}
            controls={[]}
          />
        </Box>
      </Flex>
    </main>
  )
}
