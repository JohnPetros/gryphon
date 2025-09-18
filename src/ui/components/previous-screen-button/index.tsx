import { useNavigation } from '@/ui/hooks/use-navigation'
import { PreviousScreenButtonView } from './previous-screen-button-view'

export const PreviousScreenButton = () => {
  const navigation = useNavigation()
  return <PreviousScreenButtonView onPress={navigation.goBack} />
}
