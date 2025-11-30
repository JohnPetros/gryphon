import { useEffect, useRef } from 'react'
import { Appearance, AppState } from 'react-native'

export function useAppState(callback: () => void) {
  const appState = useRef(AppState.currentState)

  useEffect(() => {
    const sub = AppState.addEventListener('change', (nextState) => {
      console.log('AppState changed', appState.current, nextState)
      if (appState.current === 'active' && nextState === 'active') {
        callback()
      }
      appState.current = nextState
    })

    return () => sub.remove()
  }, [callback])
}
