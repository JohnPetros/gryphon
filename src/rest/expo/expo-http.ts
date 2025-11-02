import type { ZodSchema } from 'zod'

import { HTTP_HEADERS } from '@/core/constants'
import type { Http, HttpSchema } from '@/core/interfaces/http'
import { RestResponse } from '@/core/responses'
import { AppError } from '@/core/domain/errors/app-error'

type ExpoHttp = {
  sendResponse: (response: RestResponse) => Response
}

type ExpoHttpParams = {
  request?: Request
  schema?: ZodSchema
  params?: Record<string, string>
}

export const ExpoHttp = async <ExpoSchema extends HttpSchema>({
  request,
  schema,
  params,
}: ExpoHttpParams = {}): Promise<Http<ExpoSchema> & ExpoHttp> => {
  let httpSchema: ExpoSchema

  if (request && schema) {
    let body: HttpSchema['body']
    let queryParams: HttpSchema['queryParams']
    let routeParams: HttpSchema['routeParams']

    // @ts-ignore
    const keys = schema.keyof().options

    if (keys.includes('queryParams')) {
      const url = new URL(request.url)
      queryParams = Object.fromEntries(url.searchParams.entries())
    }

    if (keys.includes('body')) {
      body = await request?.json()
    }

    if (keys.includes('routeParams')) {
      if (!params) throw new AppError('Next params not provided')
      routeParams = params
    }

    httpSchema = schema.parse({ body, queryParams, routeParams }) as ExpoSchema
  }

  return {
    async getBody() {
      if (!httpSchema?.body) throw new AppError('Body is not defined')
      return httpSchema?.body
    },

    getRouteParams() {
      if (!httpSchema?.routeParams) throw new AppError('Route params are not defined')
      return httpSchema?.routeParams
    },

    getQueryParams() {
      if (!httpSchema?.queryParams) throw new AppError('Query params are not defined')
      return httpSchema?.queryParams
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
