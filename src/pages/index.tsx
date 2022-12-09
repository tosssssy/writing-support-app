import { Box, Flex, Text } from '@mantine/core'
import { useElementSize, useInputState } from '@mantine/hooks'
import { Editor } from '@mantine/rte'
import { useRef, useState } from 'react'
import RichTextEditor from 'libs/RichTextEditor'
import { postApi } from 'utils/apiClient'

const content = '<p>こんにちは</p>'

export default function Home() {
  const { ref, height } = useElementSize()
  const [text, setText] = useInputState('')
  const editorRef = useRef<Editor>(null)
  const [value, setValue] = useState(content)
  const [res, setRes] = useState<any>()
  const sentences = value.slice(3, -4).split('</p><p>')
  return (
    <main>
      <button
        onClick={async () => {
          try {
            const res = await postApi('/v1/edits', {
              model: 'text-davinci-edit-001',
              input: sentences[0] || '',
              instruction: 'Fix the spelling mistakes',
            })
            setRes(res)
          } catch (error) {
            setRes(error)
          }
        }}
      >
        click
      </button>
      {JSON.stringify(res)}
      <Flex gap={15} m={100}>
        <Box mt={6.5} sx={{ height, overflow: 'hidden' }}>
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
            ref={editorRef}
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
        {/* <Textarea
          ref={ref}
          value={text}
          onChange={setText}
          placeholder="テキスト"
          autosize
          minRows={20}
          sx={{ width: 400 }}
          styles={{
            input: {
              fontSize: 16,
              lineHeight: 1.55,
            },
          }}
        /> */}
      </Flex>
    </main>
  )
}
