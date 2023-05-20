import express, { type Request, type Response } from 'express'
import { userRouter } from '../../../../modules/user/infra/http/routes'
import { HttpStatusCode } from '../HttpStatusCode'
const v1Router = express.Router()

v1Router.get('/healthcheck', (req: Request, res: Response) => {
  res.status(HttpStatusCode.OK).json({ message: 'service running ok' })
})

v1Router.use('/users', userRouter)

export { v1Router }
