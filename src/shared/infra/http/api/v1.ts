import express, { type Request, type Response } from 'express'
import { userRouter } from '../../../../modules/user/infra/http/routes'
const v1Router = express.Router()

v1Router.get('/healtcheck', (req: Request, res: Response) => {
  console.log('Healthcheck')
  res.send('Im fine!')
})

v1Router.use('/users', userRouter)

export { v1Router }
