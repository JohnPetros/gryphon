type RouteHandler = (request: Request) => Promise<Response>

export const Route = (handler: RouteHandler) => {
  return async (request: Request): Promise<Response> => {
    try {
      return await handler(request)
    } catch (error) {
      return Response.json(
        { title: 'Error', message: 'An error occurred' },
        { status: 500 },
      )
    }
  }
}
