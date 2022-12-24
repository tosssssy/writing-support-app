import { Paper, SimpleGrid, Stack } from '@mantine/core'
import { useDebouncedState } from '@mantine/hooks'
import { useMemo, useState } from 'react'
import { AppLayout } from 'components/AppLayout'
import { Editor } from 'components/Editor'
import { Suggestions } from 'components/Suggestions'
import { TabList } from 'components/TabList'
import { useAiResults } from 'hooks/useAiResults'
import { toSentences } from 'utils/sentence'

export default function Home() {
  const [richText, setRichText] = useDebouncedState('<p>テキスト</p>', 400)
  const sentences = useMemo(() => toSentences(richText), [richText])
  const [aiResults, setAiResults] = useAiResults(sentences)

  const [activeTab, setActiveTab] = useState<string | null>('suggestions')

  return (
    <AppLayout>
      <SimpleGrid cols={2} spacing="xl" h={'100%'}>
        <Paper radius={'md'} shadow="sm" p="md">
          <Editor value={richText} onChange={setRichText} />
        </Paper>

        <Stack>
          <TabList
            suggestionsCount={
              aiResults.filter(v => sentences.includes(v.key) && !v.hidden)
                .length
            }
            value={activeTab}
            onTabChange={setActiveTab}
          />

          <Paper radius={'md'} shadow="sm" p="md" h={'100%'}>
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
            {activeTab === 'search' && <>search</>}
            {activeTab === 'settings' && <>settings</>}
          </Paper>
        </Stack>
      </SimpleGrid>
    </AppLayout>
  )
}
