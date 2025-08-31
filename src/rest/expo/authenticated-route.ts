import { Route } from './route'

type RouteHandler = (request: Request) => Promise<Response>

export const AuthenticatedRoute = (handler: RouteHandler) => {
  return async (request: Request): Promise<Response> => {
    let token: string | null = null

    const authorizationHeader = request.headers.get('Authorization')
    if (authorizationHeader?.startsWith('Bearer ')) {
      token = authorizationHeader.substring(7)
    }

    if (!token) {
      return Response.json(
        { title: 'Auth Error', message: 'Token is required' },
        { status: 401 },
      )
    }

    return await Route(handler)(request)
  }
}
