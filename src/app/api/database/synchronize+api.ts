import { z } from 'zod'

import { ExpoHttp } from '@/rest/expo/expo-http'
import { Route } from '@/rest/expo/route'
import {
  PullDatabaseChangesController,
  PushDatabaseChangesController,
} from '@/rest/controllers'
import {
  accountSchema,
  credentialSchema,
  credentialVersionSchema,
  idSchema,
  vaultSchema,
} from '@/validation'
import {
  DrizzleAccountsRepository,
  DrizzleCredentialsRepository,
  DrizzleCredentialVersionsRepository,
  DrizzleVaultsRepository,
} from '@/database/drizzle/repositories'

const pullDatabaseChangesSchema = z.object({
  queryParams: z.object({
    lastPulledAt: z.coerce.date(),
  }),
})

type PullDatabaseChangesSchema = z.infer<typeof pullDatabaseChangesSchema>

export const GET = Route(async (request) => {
  const http = await ExpoHttp<PullDatabaseChangesSchema>({
    schema: pullDatabaseChangesSchema,
    request,
  })
  const controller = PullDatabaseChangesController()
  const response = await controller.handle(http)
  return http.sendResponse(response)
})

const pushDatabaseChangesSchema = z.object({
  body: z.object({
    createdCredentials: z.array(credentialSchema),
    updatedCredentials: z.array(credentialSchema),
    deletedCredentialsIds: z.array(idSchema),
    createdVaults: z.array(vaultSchema),
    updatedVaults: z.array(vaultSchema),
    deletedVaultsIds: z.array(idSchema),
    createdAccounts: z.array(accountSchema),
    updatedAccounts: z.array(accountSchema),
    deletedAccountsIds: z.array(idSchema),
    createdCredentialVersions: z.array(credentialVersionSchema),
    updatedCredentialVersions: z.array(credentialVersionSchema),
    deletedCredentialVersionsIds: z.array(idSchema),
  }),
})

type PushDatabaseChangesSchema = z.infer<typeof pushDatabaseChangesSchema>

export const POST = Route(async (request) => {
  const http = await ExpoHttp<PushDatabaseChangesSchema>({
    schema: pushDatabaseChangesSchema,
    request,
  })
  const credentialsRepository = DrizzleCredentialsRepository()
  const vaultsRepository = DrizzleVaultsRepository()
  const accountsRepository = DrizzleAccountsRepository()
  const credentialVersionRepository = DrizzleCredentialVersionsRepository()
  const controller = PushDatabaseChangesController({
    accountsRepository,
    vaultsRepository,
    credentialsRepository,
    credentialVersionRepository,
  })
  const response = await controller.handle(http)
  return http.sendResponse(response)
})
