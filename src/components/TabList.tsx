import { Tabs, Badge } from '@mantine/core'
import { IconSettings, IconSearch, IconBulb } from '@tabler/icons'
import { ComponentProps, FC } from 'react'

type TabListProps = {
  suggestionsCount: number
} & Omit<ComponentProps<typeof Tabs>, 'children'>

export const TabList: FC<TabListProps> = ({
  suggestionsCount,
  ...tabsProps
}) => {
  return (
    <Tabs {...tabsProps}>
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
              {suggestionsCount}
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
  )
}
