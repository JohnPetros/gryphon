import { Link } from 'expo-router'

import { CredentialMenu } from '@/ui/components/credential-menu'
import type { Credential } from '@/core/domain/entities'
import type { CryptoProvider } from '@/core/interfaces'

import { AppItem } from '@/ui/components/app-item'
import { Box } from '@/ui/gluestack/box'

type Props = {
  credential: Credential
  encryptionKey: string
  cryptoProvider: CryptoProvider
}

export const CredentialListItemView = ({
  credential,
  encryptionKey,
  cryptoProvider,
}: Props) => {
  const decryptedData = credential.encrypted.decrypt(encryptionKey, cryptoProvider)
  return (
    <AppItem.Container className='flex-row items-center justify-between'>
      <Link href={`/credential/${credential.id.value}`}>
        <Box className='flex-row items-center gap-3'>
          <AppItem.Icon
            name='login'
            backgroundColor='primaryBackground'
            foregroundColor='primary'
          />
          <AppItem.Info
            name={credential.title}
            description={decryptedData?.login ?? ''}
            className='w-[72%]'
          />
        </Box>
      </Link>

      <CredentialMenu credential={credential} />
    </AppItem.Container>
  )
}
