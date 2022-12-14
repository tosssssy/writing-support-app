import { Accordion, Box, Flex, List, Text } from '@mantine/core'
import { useMemo, useState } from 'react'
import { useAiResults } from 'hooks/useAiResults'
import RichTextEditor from 'libs/RichTextEditor'

const content = '<p>こんにちは</p>'

export default function Home() {
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
  const aiResults = useAiResults(sentences)

  return (
    <main>
      {/* <br />
      {JSON.stringify(sentences)}
      <br />
      <br />
      <br />
      {JSON.stringify(aiResults)} */}
      <Flex gap="xl" mt="xl" mx="auto" w="85%">
        <Flex gap="md">
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
        <Box w="100%">
          <Accordion variant="separated" multiple>
            {aiResults.map(result => {
              if (sentences.includes(result.key)) {
                return (
                  <Accordion.Item key={result.key} value={result.key}>
                    <Accordion.Control>{result.key}</Accordion.Control>
                    <Accordion.Panel>
                      <List type="ordered">
                        {result.suggestions.map((str, index) => (
                          <List.Item key={index}>{str}</List.Item>
                        ))}
                      </List>
                    </Accordion.Panel>
                  </Accordion.Item>
                )
              }
            })}
          </Accordion>
        </Box>
      </Flex>
    </main>
  )
}
