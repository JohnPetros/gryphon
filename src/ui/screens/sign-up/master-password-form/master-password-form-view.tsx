import { Box } from '@/ui/gluestack/box'
import { Text } from '@/ui/gluestack/text'
import { List } from '@/ui/components/list'
import { Button } from '@/ui/components/button'
import { Input } from '@/ui/components/input'

type Props = {
  isPasswordValid: boolean
  isLoading: boolean
  handlePasswordChange: (value: string) => void
  handleSubmit: () => void
}

export const MasterPasswordFormView = ({
  isPasswordValid,
  isLoading,
  handlePasswordChange,
  handleSubmit,
}: Props) => {
  return (
    <Box>
      <Box className='flex flex-row items-center justify-center gap-3'>
        <Text bold className='text-accent text-xl'>
          Agora sua
        </Text>
        <Text bold className='text-primary text-xl'>
          Senha Mestre.
        </Text>
      </Box>

      <Box className='mt-6'>
        <Input
          label='Senha mestre'
          icon='password'
          type='number'
          onChange={handlePasswordChange}
        />
      </Box>

      <Box className='mt-6'>
        <List
          items={[
            'Uma senha numérica que contenha pelo menos 8 dígitos.',
            'Ela é diferente da senha da sua conta e, por segurança, nós nunca a salvamos em nossos servidores.',
            'Se você esquecer sua senha mestra, não haverá como recuperar seus dados. Anote-a e guarde-a em um lugar seguro.',
          ]}
        />
      </Box>

      <Box className='mt-12'>
        <Button
          onPress={handleSubmit}
          isDisabled={!isPasswordValid}
          isLoading={isLoading}
        >
          Criar senha mestra
        </Button>
      </Box>
    </Box>
  )
}
