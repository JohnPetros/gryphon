import { createContext, type PropsWithChildren } from 'react'

import { Icon } from '@/ui/components/icon'
import { KeyboardAccessory } from '@/ui/components/keyboard-accessory'
import { Text } from '@/ui/gluestack/text'
import { Box } from '@/ui/gluestack/box'
import type { InternetContextValue } from './internet-context-value'
import { useInternetContextProvider } from './use-internet-context-provider'
import { useDatabase } from '@/ui/hooks/use-database'

export const InternetContext = createContext({} as InternetContextValue)

export const InternetContextProvider = ({ children }: PropsWithChildren) => {
  const { synchronizeDatabase } = useDatabase()
  const { isOffline } = useInternetContextProvider(synchronizeDatabase)

  return (
    <InternetContext.Provider value={{ isOffline }}>
      <KeyboardAccessory isVisible={isOffline}>
        <Box className='flex-row items-center justify-center gap-2 p-2 bg-black'>
          <Icon name='offline' color='danger' size={20} />
          <Text className='text-danger text-lg'>Você não está conectado à internet</Text>
        </Box>
      </KeyboardAccessory>
      {children}
    </InternetContext.Provider>
  )
}
