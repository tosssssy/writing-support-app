import { ActionIcon, Box, TextInput, Text, Loader } from '@mantine/core'
import { IconSearch } from '@tabler/icons'
import { FC, useState } from 'react'
import { getApi } from 'utils/apiClient'

type SearchProps = {}

export const Search: FC<SearchProps> = ({}) => {
  const [wordInput, setWordInput] = useState('')
  const [description, setDescription] = useState('')

  const [requesting, setRequesting] = useState(false)
  return (
    <Box>
      <form
        onSubmit={async e => {
          e.preventDefault()
          setRequesting(true)
          try {
            const res = await getApi('/api/media-wiki', {
              title: wordInput,
            })
            const extract = Object.entries(res.query.pages)[0]![1].extract
            setDescription(extract || '検索結果がありませんでした。')
            setRequesting(false)
          } catch (error) {
            console.error(error)
          }
        }}
      >
        <TextInput
          label="Wikipedia検索"
          placeholder="検索ワードを入力"
          value={wordInput}
          onChange={e => setWordInput(e.target.value)}
          rightSection={
            <>
              {requesting ? (
                <Loader size={18} />
              ) : (
                <ActionIcon type="submit" variant="transparent">
                  <IconSearch size={18} />
                </ActionIcon>
              )}
            </>
          }
        />
      </form>
      <Text mt={'xl'} mx="xs">
        {description}
      </Text>
    </Box>
  )
}
