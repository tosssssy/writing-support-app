import {
  Box,
  Accordion,
  Flex,
  CloseButton,
  List,
  Text,
  Popover,
  ActionIcon,
  Button,
  Group,
  Loader,
  Center,
} from '@mantine/core'
import { IconReplace } from '@tabler/icons'
import { FC, useState } from 'react'
import { AiResults } from 'types/common'

type ItemProps = {
  sentence: string
  onReplace: (sentence: string) => void
}

const Item: FC<ItemProps> = ({ sentence, onReplace }) => {
  const [opened, setOpened] = useState(false)
  return (
    <Flex>
      <Text fz="sm">{sentence}</Text>

      <Popover
        width={200}
        position="bottom"
        withArrow
        shadow="md"
        opened={opened}
        onChange={setOpened}
      >
        <Popover.Target>
          <ActionIcon
            mt={-2}
            variant="transparent"
            onClick={() => setOpened(v => !v)}
          >
            <IconReplace size={18} />
          </ActionIcon>
        </Popover.Target>

        <Popover.Dropdown>
          <Group position="center">
            <Button
              size="xs"
              variant="filled"
              onClick={() => onReplace(sentence)}
            >
              Replace
            </Button>
            <Button
              size="xs"
              variant="outline"
              onClick={() => setOpened(false)}
            >
              Cancel
            </Button>
          </Group>
        </Popover.Dropdown>
      </Popover>
    </Flex>
  )
}

type SuggestionsProps = {
  aiResults: AiResults
  sentences: string[]
  onReplaceSentence: (from: string, to: string) => void
  onHidden: (key: AiResults[number]['key']) => void
}

export const Suggestions: FC<SuggestionsProps> = ({
  aiResults,
  sentences,
  onReplaceSentence,
  onHidden,
}) => {
  return (
    <Box w="100%">
      <Accordion
        variant="separated"
        chevronPosition="left"
        chevronSize={20}
        multiple
      >
        {aiResults.map(result => {
          if (sentences.includes(result.key) && !result.hidden) {
            return (
              <Accordion.Item key={result.key} value={result.key}>
                <Flex align={'center'} mr="xs">
                  <Accordion.Control>{result.key}</Accordion.Control>
                  <CloseButton onClick={() => onHidden(result.key)} />
                </Flex>

                <Accordion.Panel>
                  {result.suggestions.length === 0 ? (
                    <Center>
                      <Loader size={'sm'} />
                    </Center>
                  ) : (
                    <List type="ordered">
                      {result.suggestions.map((str, index) => (
                        <List.Item key={index + str} p="xs">
                          <Item
                            sentence={str}
                            onReplace={to => onReplaceSentence(result.key, to)}
                          />
                        </List.Item>
                      ))}
                    </List>
                  )}
                </Accordion.Panel>
              </Accordion.Item>
            )
          }
        })}
      </Accordion>
    </Box>
  )
}
