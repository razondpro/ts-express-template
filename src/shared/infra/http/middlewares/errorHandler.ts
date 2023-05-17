import { type ErrorRequestHandler, type NextFunction, type Request, type Response } from 'express'
import { HttpStatusCode } from '../HttpStatusCode'

export const errorMiddleware: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError) {
    return res.status(400).json({ status: HttpStatusCode.BAD_REQUEST, message: 'Please, enter a valid json body' })
  }

  return res.status(500).json({ status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: 'Internal server error' })
}
