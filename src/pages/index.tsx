import { Paper, SimpleGrid, Stack } from '@mantine/core'
import { useMemo, useState } from 'react'
import { AppLayout } from 'components/AppLayout'
import { Editor } from 'components/Editor'
import { Suggestions } from 'components/Suggestions'
import { TabList } from 'components/TabList'
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
          <TabList
            suggestionsCount={
              aiResults.filter(v => sentences.includes(v.key)).length
            }
            value={activeTab}
            onTabChange={setActiveTab}
          />

          <Paper radius={'md'} shadow="sm" p="md" withBorder h={'100%'}>
            {activeTab === 'suggestions' && (
              <Suggestions
                aiResults={aiResults}
                sentences={sentences}
                onReplaceSentence={(from, to) =>
                  setValue(value.replace(from, to))
                }
              />
            )}
            {activeTab === 'search' && <>search</>}
            {activeTab === 'settings' && <>settings</>}
          </Paper>
        </Stack>
      </SimpleGrid>
    </AppLayout>
  )
}
