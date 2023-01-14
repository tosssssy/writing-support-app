import { Paper, SimpleGrid, Stack } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { useMemo, useState } from 'react'
import { AppLayout } from 'components/AppLayout'
import { Counter } from 'components/Counter'
import { Editor } from 'components/Editor'
import { Search } from 'components/Search'
import { Settings } from 'components/Settings'
import { Suggestions } from 'components/Suggestions'
import { TabList } from 'components/TabList'
import { useAiResults } from 'hooks/useAiResults'
import { toSentences } from 'utils/sentence'

export default function Home() {
  const [richText, setRichText] = useLocalStorage<string>({
    key: 'richtext',
    defaultValue: '',
  })
  const sentences = useMemo(() => toSentences(richText), [richText])
  const [aiResults, setAiResults] = useAiResults(sentences)

  const [activeTab, setActiveTab] = useState<string | null>('suggestions')

  return (
    <AppLayout>
      <SimpleGrid cols={2} spacing="xl" h={'100%'}>
        <Stack>
          <Paper radius={'md'} shadow="xs" p="md">
            <Counter richText={richText} />
          </Paper>
          <Paper radius={'md'} shadow="xs" p="md" pl="xs" sx={{ flex: 1 }}>
            <Editor value={richText} onChange={setRichText} />
          </Paper>
        </Stack>

        <Stack>
          <TabList
            suggestionsCount={
              aiResults.filter(v => sentences.includes(v.key) && !v.hidden)
                .length
            }
            value={activeTab}
            onTabChange={setActiveTab}
          />

          <Paper radius={'md'} shadow="xs" p="md" h={'100%'}>
            {activeTab === 'suggestions' && (
              <Suggestions
                aiResults={aiResults}
                sentences={sentences}
                onReplaceSentence={(from, to) =>
                  setRichText(richText.replace(from, to))
                }
                onHidden={key => {
                  setAiResults(results =>
                    results.map(v =>
                      key === v.key ? { ...v, hidden: true } : v,
                    ),
                  )
                }}
              />
            )}
            {activeTab === 'search' && <Search />}
            {activeTab === 'settings' && <Settings />}
          </Paper>
        </Stack>
      </SimpleGrid>
    </AppLayout>
  )
}
