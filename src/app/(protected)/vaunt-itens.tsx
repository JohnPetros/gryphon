import { Box } from '@/ui/gluestack/box'
import { Text } from '@/ui/gluestack/text'
import { useAuthContext } from '@/ui/hooks/use-auth-context'

const Screen = () => {
  const { account } = useAuthContext()
  console.log('account', account?.dto)
  return (
    <Box>
      <Text>Vaunt Itens</Text>
    </Box>
  )
}

export default Screen
