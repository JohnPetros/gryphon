import { useRef } from 'react'
import { Redirect } from 'expo-router'

import { useSecureStorage } from '@/ui/hooks/use-secure-storage'
import { useNavigation } from '@/ui/hooks/use-navigation'
import { useDatabase } from '@/ui/hooks/use-database'
import { MasterPasswordConfirmationDialog } from '@/ui/components/master-password-confirmation-dialog'
import { useAuth } from '@/ui/hooks/use-auth'
import { useAuthContext } from '@/ui/hooks/use-auth-context'
import type { MasterPasswordConfirmationDialogRef } from '../../components/master-password-confirmation-dialog/types'
import { useDataImportScreen } from './use-data-import-screen'
import { LoadingDialog } from '@/ui/components/loading-dialog'

export const DataImportScreen = () => {
  const masterPasswordConfirmationDialogRef =
    useRef<MasterPasswordConfirmationDialogRef | null>(null)
  const { signOutAccount } = useAuth()
  const { account, createEncryptionKey, loadAccount } = useAuthContext()
  const storageProvider = useSecureStorage()
  const navigationProvider = useNavigation()
  const { accountId } = useAuth()
  const { pullAllDatabaseChanges } = useDatabase()
  const { isImporting, handlePasswordSubmit } = useDataImportScreen({
    account,
    masterPasswordConfirmationDialogRef,
    storageProvider,
    navigationProvider,
    onCorrectPasswordSubmit: async (masterPassword) => {
      await pullAllDatabaseChanges()
      if (account) await createEncryptionKey(masterPassword, account.encryptionSalt)
    },
    onDialogOpen: loadAccount,
    onDialogClose: signOutAccount,
  })

  if (!accountId) return <Redirect href='/auth/sign-in' />

  return (
    <>
      <LoadingDialog
        isOpen={account === null || isImporting}
        message='Carregando os dados da sua conta...'
      />
      <MasterPasswordConfirmationDialog
        ref={masterPasswordConfirmationDialogRef}
        description='Insira a senha mestra para poder importar os dados de seu outro dispositivo.'
        canClose={false}
        kcv={account?.kcv}
        shouldSuppressMasterPasswordRequirement
        onCorrectPasswordSubmit={handlePasswordSubmit}
      />
    </>
  )
}
