import { AppItem } from '@/ui/components/app-item'
import { PasswordGenerator } from '@/ui/components/password-generator'
import { ScreenContainer } from '@/ui/components/screen-container'
import { ScreenTitle } from '@/ui/components/screen-title'
import { Box } from '@/ui/gluestack/box'
import { Link } from 'expo-router'

export const NewItemScreenView = () => {
  return (
    <ScreenContainer>
      <ScreenTitle>Adicionar Item</ScreenTitle>

      <Box className='flex flex-col gap-6 mt-6 pr-6'>
        <Link href='/(protected)/credential/settings/new'>
          <AppItem.Container className='flex-row gap-3'>
            <AppItem.Icon
              backgroundColor='primaryBackground'
              foregroundColor='primary'
              name='login'
            />
            <AppItem.Info
              name='Credencial'
              description='Adicione e-mail/nome de usuário e senha'
              lineCount={2}
            />
          </AppItem.Container>
        </Link>

        <Link href='/(protected)/note/settings/new'>
          <AppItem.Container className='flex-row gap-3'>
            <AppItem.Icon
              backgroundColor='warningBackground'
              foregroundColor='warning'
              name='note'
            />
            <AppItem.Info
              name='Nota'
              description='Adicione chaves de recuperação, respostas secretas ou códigos'
              lineCount={2}
            />
          </AppItem.Container>
        </Link>

        <PasswordGenerator>
          <AppItem.Container className='flex-row gap-3'>
            <AppItem.Icon
              backgroundColor='dangerBackground'
              foregroundColor='danger'
              name='password'
            />
            <AppItem.Info
              name='Senha'
              description='Gere uma senha aleatória'
              lineCount={2}
            />
          </AppItem.Container>
        </PasswordGenerator>

        <Link href='/(protected)/vault/new'>
          <AppItem.Container className='flex-row gap-3'>
            <AppItem.Icon
              backgroundColor='infoBackground'
              foregroundColor='info'
              name='vault'
            />
            <AppItem.Info
              name='Cofre'
              description='Armazene suas credenciais e notas em uma categoria'
              lineCount={2}
            />
          </AppItem.Container>
        </Link>
      </Box>
    </ScreenContainer>
  )
}
