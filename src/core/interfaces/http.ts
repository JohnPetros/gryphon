import type { RestResponse } from '../responses'

export type HttpSchema = {
  body?: unknown
  routeParams?: unknown
  queryParams?: unknown
}

export interface Http<Schema extends HttpSchema = HttpSchema> {
  getBody(): Promise<Schema['body']>
  getRouteParams(): Schema['routeParams']
  getQueryParams(): Schema['queryParams']
  send(json?: unknown, statusCode?: number): RestResponse
  pass(): RestResponse
}
