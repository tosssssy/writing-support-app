import {
  ActionIcon,
  AppShell,
  Flex,
  Header,
  Title,
  useMantineColorScheme,
} from '@mantine/core'
import { IconSun, IconMoonStars } from '@tabler/icons'
import { FC, ReactNode } from 'react'

type AppLayoutProps = {
  children: ReactNode
}

export const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  return (
    <AppShell
      header={
        <Header height={60}>
          <Flex h="100%" px="xl" align="center" justify="space-between">
            <Title
              order={1}
              variant="gradient"
              gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
            >
              Writing Support App
            </Title>
            <ActionIcon
              variant="outline"
              color={dark ? 'yellow' : 'blue'}
              onClick={() => toggleColorScheme()}
              title="Toggle color scheme"
            >
              {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
            </ActionIcon>
          </Flex>
        </Header>
      }
      styles={theme => ({
        body: { minHeight: '100vh' },
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[1],
        },
      })}
    >
      {children}
    </AppShell>
  )
}
