import z from 'zod'

// const clientEnv = {
//   clerkPublishableKey:
//     process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ??
//     'pk_test_ZGVsaWNhdGUtbW9zcXVpdG8tNDIuY2xlcmsuYWNjb3VudHMuZGV2JA',
//   gryphonBaseUrl:
//     process.env.EXPO_PUBLIC_GRYPHON_BASE_URL ?? 'https://gryphon--fyde8z7f25.expo.app',
//   kcvText: process.env.EXPO_PUBLIC_KCV_TEXT ?? 'gryphon',
//   oneSignalAppId:
//     process.env.EXPO_PUBLIC_ONE_SIGNAL_APP_ID ??
//     'os_v2_app_5st3sqdw5jhrlbr37t3s37y2uwbltpzdf56ujzunog6pbrghob44vp54eimyqzu4in7mdbjmr7myvak5d2ryphvdqldkm6sd6w2cvpy',
//   hibpUrl: process.env.EXPO_PUBLIC_HIBP_URL ?? 'https://api.pwnedpasswords.com/range',
// }

const clientEnv = {
  clerkPublishableKey: 'pk_test_ZGVsaWNhdGUtbW9zcXVpdG8tNDIuY2xlcmsuYWNjb3VudHMuZGV2JA',
  gryphonBaseUrl: 'https://gryphon--fyde8z7f25.expo.app',
  kcvText: 'gryphon',
  oneSignalAppId: 'eca7b940-76ea-4f15-863b-fcf72dff1aa5',
  hibpUrl: 'https://api.pwnedpasswords.com/range',
}

const clientEnvSchema = z.object({
  clerkPublishableKey: z.string().min(1),
  gryphonBaseUrl: z.url(),
  hibpUrl: z.url(),
  kcvText: z.string().min(1),
  oneSignalAppId: z.string().min(1),
})

export const CLIENT_ENV = clientEnvSchema.parse(clientEnv)
