import { Link } from 'expo-router'

import type { Id } from '@/core/domain/structures'

import { AppItem } from '../app-item'
import { Alert } from 'react-native'

type Props = {
  credentialId: Id
  credentialTitle: string
  onDelete: (credentialId: Id) => void
  onCopyEmail: () => void
  onCopyPassword: () => void
}

export const CredentialMenuView = ({
  credentialId,
  credentialTitle,
  onDelete,
  onCopyEmail,
  onCopyPassword,
}: Props) => {
  return (
    <AppItem.Menu>
      {(close) => (
        <>
          <AppItem.MenuOption color='accent' icon='login'>
            {credentialTitle}
          </AppItem.MenuOption>
          <AppItem.MenuOption
            color='neutral'
            icon='copy'
            onPress={() => {
              onCopyEmail()
              close()
            }}
          >
            Copiar login
          </AppItem.MenuOption>
          <AppItem.MenuOption
            color='neutral'
            icon='copy'
            onPress={() => {
              onCopyPassword()
              close()
            }}
          >
            Copiar senha
          </AppItem.MenuOption>
          <Link
            href={`/credential/settings/${credentialId.value}`}
            onPress={close}
            asChild
          >
            <AppItem.MenuOption color='neutral' icon='edit'>
              Editar
            </AppItem.MenuOption>
          </Link>
          <AppItem.MenuOption
            color='danger'
            icon='trash'
            onPress={() => {
              Alert.alert(
                'Excluir Credencial?',
                'Tem certeza que deseja excluir esta credencial? Nunca será possível recuperá-la.',
                [
                  {
                    text: 'Cancelar',
                    style: 'cancel',
                  },
                  {
                    text: 'Excluir',
                    onPress: () => {
                      onDelete(credentialId)
                      close()
                    },
                  },
                ],
              )
            }}
          >
            Excluir
          </AppItem.MenuOption>
        </>
      )}
    </AppItem.Menu>
  )
}
