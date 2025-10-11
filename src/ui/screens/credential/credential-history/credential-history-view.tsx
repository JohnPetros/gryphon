import type { CredentialVersion } from '@/core/domain/entities/credential-version'
import type { Credential } from '@/core/domain/entities'

import { Box } from '@/ui/gluestack/box'
import { Text } from '@/ui/gluestack/text'
import { CredentialHistoryPoint } from './credential-history-point'

type Props = {
  credential: Credential
  versions: CredentialVersion[]
  onRestore: () => void
}

export const CredentialHistoryView = ({ credential, versions, onRestore }: Props) => {
  return (
    <Box>
      <Text>Histórico</Text>

      <Box className='mt-3 p-6 bg-surface flex flex-col gap-6'>
        {versions.map((version) => {
          return (
            <CredentialHistoryPoint
              key={version.id.value}
              credential={credential}
              credentialVersion={version}
              isLastVersion={version.id.value === credential.lastVersionId?.value}
              createdAt={version.createdAt}
              icon={version.isRestoration ? 'restoration' : 'edit'}
              title={
                version.isRestoration
                  ? `Restaurado para a versão ${version.versionNumber}`
                  : `Editado (Versão ${version.versionNumber})`
              }
              onRestore={onRestore}
            />
          )
        })}
        <CredentialHistoryPoint
          icon='sparkles'
          title='Criado'
          credential={credential}
          credentialVersion={credential.versionZero}
          isLastVersion={false}
          createdAt={credential.createdAt}
          onRestore={onRestore}
        />
      </Box>
    </Box>
  )
}
