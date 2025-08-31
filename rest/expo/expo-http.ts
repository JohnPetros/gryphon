import type { ZodSchema } from 'zod'

import { HTTP_HEADERS } from '@/core/constants'
import type { Http, HttpSchema } from '@/core/interfaces/http'
import { RestResponse } from '@/core/responses'

type ExpoHttp = {
  sendResponse: (response: RestResponse) => Response
}

export type ExpoParams<Params extends string = ''> = {
  params: Promise<{
    [key in Params]: string
  }>
}

type ExpoHttpParams = {
  request?: Request
  schema?: ZodSchema
  params?: ExpoParams
}

export const ExpoHttp = <ExpoSchema extends HttpSchema>({
  request,
  schema,
  params,
}: ExpoHttpParams = {}): Http<ExpoSchema> & ExpoHttp => {
  return {
    async getBody() {
      return null
    },

    getRouteParams() {
      return null
    },

    getQueryParams() {
      return null
    },

    pass() {
      return new RestResponse({ headers: { [HTTP_HEADERS.xPass]: 'true' } })
    },

    send(json?: unknown, statusCode?: number) {
      return new RestResponse({
        body: json,
        statusCode,
      })
    },

    sendResponse(response: RestResponse): Response {
      return Response.json(response.body, {
        status: response.statusCode,
        headers: response.headers,
      })
    },
  }
}
