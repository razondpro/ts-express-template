import { type NextFunction, type Request, type Response } from 'express'
import { HttpStatusCode } from '../HttpStatusCode'

export const invalidRouteHandler = (req: Request, res: Response, next: NextFunction): void => {
  res.status(404).json({ status: HttpStatusCode.NOT_FOUND, message: 'Route not found' })
  next()
}
