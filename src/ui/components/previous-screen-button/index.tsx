import { useNavigation } from '@/ui/hooks/use-navigation'
import { PreviousScreenButtonView } from './previous-screen-button-view'
import { usePreviousScreenButton } from './use-previous-screen-button'

type Props = {
  url?: string
}

export const PreviousScreenButton = ({ url }: Props) => {
  const navigationProvider = useNavigation()
  const { handlePress } = usePreviousScreenButton({ url, navigationProvider })
  return <PreviousScreenButtonView onPress={handlePress} />
}
