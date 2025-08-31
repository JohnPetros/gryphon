import { HTTP_HEADERS, HTTP_STATUS_CODE } from '../constants'
import { AppError } from '../domain/errors'

type RestResponseProps<Body> = {
  body?: Body
  statusCode?: number
  errorMessage?: string
  headers?: Record<string, string>
}

export class RestResponse<Body = unknown> {
  private readonly _body: Body | null
  private readonly _errorMessage: string | null
  readonly statusCode: number = HTTP_STATUS_CODE.ok
  readonly headers: Record<string, string> = {}

  constructor({ body, statusCode, errorMessage, headers }: RestResponseProps<Body> = {}) {
    this._body = body ?? null
    this._errorMessage = errorMessage ?? null
    if (statusCode) this.statusCode = statusCode
    if (headers) this.headers = headers
  }

  throwError(): never {
    throw new AppError(this.errorMessage)
  }

  get isSuccessful() {
    return this.statusCode <= HTTP_STATUS_CODE.redirect
  }

  get isFailure() {
    return this.statusCode >= HTTP_STATUS_CODE.badRequest || Boolean(this._errorMessage)
  }

  get isValidationFailure() {
    return this.statusCode === HTTP_STATUS_CODE.badRequest
  }

  getHeader(key: string) {
    return this.headers[key] ?? null
  }

  get body(): Body {
    if (this._errorMessage) {
      throw new AppError('Rest Response failed')
    }

    return this._body as Body
  }

  get errorMessage(): string {
    if (!this._errorMessage) {
      throw new AppError('Rest Response has no error message')
    }

    return this._errorMessage
  }

  get isRedirecting() {
    return (
      this.statusCode === HTTP_STATUS_CODE.redirect &&
      this.getHeader(HTTP_HEADERS.location)
    )
  }
}
