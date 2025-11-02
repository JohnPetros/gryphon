import { AppError, NotFoundError } from '@/core/domain/errors'

type Params = Record<string, string>

type RouteHandler = (request: Request, params: Params) => Promise<Response>

export const Route = (handler: RouteHandler) => {
  return async (request: Request, params: Params = {}): Promise<Response> => {
    try {
      return await handler(request, params)
    } catch (error) {
      console.error(error)

      if (error instanceof NotFoundError) {
        return Response.json(
          { title: error.title, message: error.message },
          {
            status: 404,
          },
        )
      }

      if (error instanceof AppError) {
        return Response.json(
          { title: error.title, message: error.message },
          {
            status: 500,
          },
        )
      }

      return Response.json(
        { title: 'Error', message: 'Unexpected error occurred' },
        { status: 500 },
      )
    }
  }
}
