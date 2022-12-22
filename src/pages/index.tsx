import { Badge, Paper, SimpleGrid, Stack, Tabs } from '@mantine/core'
import { IconSettings, IconSearch, IconBulb } from '@tabler/icons'
import { useMemo, useState } from 'react'
import { AppLayout } from 'components/AppLayout'
import { Editor } from 'components/Editor'
import { Suggestions } from 'components/Suggestions'
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

  const [activeTab, setActiveTab] = useState<string | null>('suggestions')

  return (
    <AppLayout>
      <SimpleGrid cols={2} spacing="xl">
        <Paper radius={'md'} shadow="sm" p="md" withBorder h={'100%'}>
          <Editor value={value} onChange={setValue} />
        </Paper>

        <Stack>
          <Tabs value={activeTab} onTabChange={setActiveTab}>
            <Tabs.List>
              <Tabs.Tab
                icon={<IconBulb size={14} />}
                value="suggestions"
                rightSection={
                  <Badge
                    sx={{ width: 16, height: 16, pointerEvents: 'none' }}
                    variant="filled"
                    size="xs"
                    p={0}
                  >
                    {aiResults.map(v => sentences.includes(v.key) && 1).length}
                  </Badge>
                }
              >
                Suggestions
              </Tabs.Tab>
              <Tabs.Tab icon={<IconSearch size={14} />} value="search">
                Search
              </Tabs.Tab>
              <Tabs.Tab icon={<IconSettings size={14} />} value="settings">
                Settings
              </Tabs.Tab>
            </Tabs.List>
          </Tabs>
          <Paper radius={'md'} shadow="sm" p="md" withBorder h={'100%'}>
            <Suggestions aiResults={aiResults} sentences={sentences} />
          </Paper>
        </Stack>
      </SimpleGrid>
    </AppLayout>
  )
}
