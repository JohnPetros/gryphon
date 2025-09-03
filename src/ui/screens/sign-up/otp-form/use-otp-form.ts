import { useState } from 'react'

export function useOtpForm(
  verifyOtpCode: (code: string) => Promise<boolean>,
  onConfirm: () => void,
) {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [isFilled, setIsFilled] = useState(false)

  async function handleFilled(code: string) {
    setIsFilled(true)
    try {
      const isCorrect = await verifyOtpCode(code)

      if (isCorrect) {
        setStatus('success')
        setTimeout(() => {
          onConfirm()
        }, 1000)
      } else {
        setStatus('error')
      }
    } catch (error) {
      console.log('error', error)
      setStatus('error')
    }
  }

  function handleCodeChange(code: string) {
    setStatus('idle')
    setIsFilled(code.length === 6)
  }

  return {
    isFilled,
    status,
    handleFilled,
    handleCodeChange,
  }
}
