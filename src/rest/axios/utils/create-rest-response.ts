import type { AxiosResponse } from 'axios'
import { RestResponse } from '@/core/responses/rest-response'

export function createRestResponse<ResponseBody>(
  response: AxiosResponse<ResponseBody>,
): RestResponse<ResponseBody> {
  console.log('Axios response', response)
  return new RestResponse<ResponseBody>({
    body: response.data,
    statusCode: response.status,
    headers: response.headers as Record<string, string>,
  })
}
