import type { RestResponse } from '../responses'
import type { Http, HttpSchema } from './http'

export interface Controller<ControllerHttpSchema extends HttpSchema = HttpSchema> {
  handle(http: Http<ControllerHttpSchema>): Promise<RestResponse>
}
