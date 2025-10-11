import { Alert } from 'react-native'

import type { IconName } from '@/ui/components/icon/types'
import { Icon } from '@/ui/components/icon'
import { Box } from '@/ui/gluestack/box'
import { Text } from '@/ui/gluestack/text'
import { AppItem } from '@/ui/components/app-item'

type Props = {
  icon: IconName
  title: string
  date: string
  versionNumber: number
  login: string
  password: string
  isLastVersion: boolean
  isRestoration: boolean
  onCopyLogin: () => void
  onCopyPassword: () => void
  onRestore: () => void
}

export const CredentialHistoryPointView = ({
  isLastVersion,
  icon,
  title,
  date,
  versionNumber,
  login,
  password,
  isRestoration,
  onCopyLogin,
  onCopyPassword,
  onRestore,
}: Props) => {
  console.log('isLastVersion', isLastVersion)
  return (
    <Box className='flex-row items-center gap-4'>
      <Icon name={icon} />
      <Box className='flex-1 flex-col'>
        <Text className='text-lg text-accent font-semibold'>{title}</Text>
        <Text className='text-sm text-neutral'>{date}</Text>
      </Box>
      {versionNumber !== 0 && !isRestoration && !isLastVersion && (
        <AppItem.Menu>
          {(close) => (
            <>
              <AppItem.MenuOption color='accent' icon='login'>
                Versão {versionNumber.toString()}
              </AppItem.MenuOption>
              <AppItem.MenuOption
                color='neutral'
                icon='copy'
                onPress={() => {
                  onCopyLogin()
                  close()
                }}
              >
                {login}
              </AppItem.MenuOption>
              <AppItem.MenuOption
                color='neutral'
                icon='copy'
                onPress={() => {
                  onCopyPassword()
                  close()
                }}
              >
                {password}
              </AppItem.MenuOption>
              <AppItem.MenuOption
                color='accent'
                icon='restoration'
                onPress={() => {
                  Alert.alert(
                    'Restaurar para esta versão?',
                    `Tem certeza que deseja restaurar para a versão ${versionNumber}?`,
                    [
                      {
                        text: 'Cancelar',
                        style: 'cancel',
                      },
                      {
                        text: 'Restaurar',
                        onPress: () => {
                          onRestore()
                          close()
                        },
                      },
                    ],
                  )
                }}
              >
                Restaurar para esta versão
              </AppItem.MenuOption>
            </>
          )}
        </AppItem.Menu>
      )}
    </Box>
  )
}
