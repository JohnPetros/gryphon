import { RestResponse } from '@/core/responses/rest-response'
import { isAxiosError } from 'axios'

export function handleError<ResponseBody>(error: any): RestResponse<ResponseBody> {
  if (isAxiosError(error)) {
    console.log('Axios Error:', error.message)
  }

  if (error.response) {
    return new RestResponse<ResponseBody>({
      statusCode: error.response.status,
      errorMessage: error.response.data?.message || error.message || 'HTTP Error',
      headers: error.response.headers as Record<string, string>,
    })
  } else if (error.request) {
    return new RestResponse<ResponseBody>({
      statusCode: 0,
      errorMessage: 'Network Error: No response received',
    })
  } else {
    return new RestResponse<ResponseBody>({
      statusCode: 0,
      errorMessage: error.message || 'Unknown Error',
    })
  }
}
