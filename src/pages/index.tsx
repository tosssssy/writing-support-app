import { Box, Flex, Text } from '@mantine/core'
import { useEffect, useMemo, useState } from 'react'
import RichTextEditor from 'libs/RichTextEditor'
import { postApi } from 'utils/apiClient'

const content = '<p>こんにちは</p>'

export default function Home() {
  // const editorRef = useRef<Editor>(null)
  const [value, setValue] = useState(content)
  const sentences = useMemo(
    () =>
      value
        .replaceAll('<p>', '')
        .replaceAll('</p>', '')
        .replaceAll('<br>', '')
        .split('。')
        .slice(0, -1),
    [value],
  )
  const [aiResult, setAiResult] = useState<
    { key: string; suggestions: string[] }[]
  >([])

  useEffect(() => {
    for (const sentence of sentences) {
      if (!aiResult.every(v => v.key !== sentence)) {
        return
      }

      ;(async () => {
        const res = await postApi('/v1/edits', {
          model: 'text-davinci-edit-001',
          input: sentence,
          instruction: 'Please make it better worded.',
          n: 3,
        })
        setAiResult(v => [
          ...v,
          { key: sentence, suggestions: res.choices.map(v => v.text) },
        ])
      })()
    }
  }, [aiResult, sentences])

  return (
    <main>
      <br />
      {JSON.stringify(value)}
      <br />
      <br />
      <br />
      {JSON.stringify(sentences)}
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
