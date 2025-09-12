import { useCallback } from 'react'
import * as ExpoCrypto from 'expo-crypto'
import CryptoJS from 'crypto-es'

import type { CryptoProvider } from '@/core/interfaces'

const SALT_LENGTH = 16
const KEY_SIZE_WORDS = 256 / 32 // 256 bits = 8 words de 32 bits
const ITERATIONS = 1000

export function useCryptoProvider(): CryptoProvider {
  const generateSalt = useCallback(async () => {
    const randomBytes = await ExpoCrypto.getRandomBytesAsync(SALT_LENGTH)

    const hexString = Array.from(randomBytes)
      .map((byte) => byte.toString(SALT_LENGTH).padStart(2, '0'))
      .join('')

    return hexString
  }, [])

  const deriveKey = useCallback(async (masterPassword: string, salt: string) => {
    const saltWordArray = CryptoJS.enc.Hex.parse(salt)

    const derivedKey = CryptoJS.PBKDF2(masterPassword, saltWordArray, {
      keySize: KEY_SIZE_WORDS,
      iterations: ITERATIONS,
      hasher: CryptoJS.algo.SHA256,
    })

    return derivedKey.toString()
  }, [])

  const encrypt = useCallback(async (data: unknown, encryptionKey: string) => {
    console.log('data', data)
    console.log('encryptionKey', encryptionKey)
    const dataString = JSON.stringify(data)
    const keyWordArray = CryptoJS.enc.Hex.parse(encryptionKey)
    const encrypted = CryptoJS.AES.encrypt(dataString, keyWordArray)
    return encrypted.toString()
  }, [])

  const decrypt = useCallback((ciphertext: string, encryptionKey: string) => {
    const keyWordArray = CryptoJS.enc.Hex.parse(encryptionKey)
    const decrypted = CryptoJS.AES.decrypt(ciphertext, keyWordArray)
    const decryptedString = decrypted.toString(CryptoJS.enc.Utf8)
    return decryptedString
  }, [])

  return {
    generateSalt,
    deriveKey,
    encrypt,
    decrypt,
  }
}
