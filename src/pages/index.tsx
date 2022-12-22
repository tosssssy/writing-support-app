import { Accordion, Box, CloseButton, Flex, List, Text } from '@mantine/core'
import { useMemo, useState } from 'react'
import { AppLayout } from 'components/AppLayout'
import { Editor } from 'components/Editor'
import { useAiResults } from 'hooks/useAiResults'

const content = '<p>テキスト</p>'

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
    <AppLayout>
      {/* <br />
      {JSON.stringify(sentences)}
      <br />
      <br />
      <br />
      {JSON.stringify(aiResults)} */}
      <Flex>
        <Editor value={value} onChange={setValue} />
        <Box w="100%">
          <Accordion
            variant="separated"
            chevronPosition="left"
            chevronSize={20}
            multiple
          >
            {aiResults.map(result => {
              if (sentences.includes(result.key)) {
                return (
                  <Accordion.Item key={result.key} value={result.key}>
                    <Flex align={'center'} mr="xs">
                      <Accordion.Control>{result.key}</Accordion.Control>
                      <CloseButton />
                    </Flex>
                    <Accordion.Panel>
                      <List type="ordered">
                        {result.suggestions.map((str, index) => (
                          <List.Item key={index} p="xs">
                            <Text fz="sm">{str}</Text>
                          </List.Item>
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
    </AppLayout>
  )
}
