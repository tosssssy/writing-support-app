import { Box, Accordion, Flex, CloseButton, List, Text } from '@mantine/core'
import { FC } from 'react'
import { AiResults } from 'types/common'

type SuggestionsProps = {
  aiResults: AiResults
  sentences: string[]
}

export const Suggestions: FC<SuggestionsProps> = ({ aiResults, sentences }) => {
  return (
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
  )
}
