import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import compression from 'compression'
import helmet from 'helmet'
import { v1Router } from './api/v1'
import { envs } from './config'
import { errorMiddleware } from './middlewares/errorHandler'
import { invalidRouteHandler } from './middlewares/invalidRouteHandler'

const origin = {
  origin: envs.IS_PROD ? 'https://mydomain.com' : '*'
}

export class Server {
  private readonly app: express.Application
  constructor () {
    this.app = express()

    this.initializeMiddlewares()

    this.configRoutes()

    this.configInvalidRouteHandler()

    this.initializeErrorHandling()
  }

  private initializeMiddlewares (): void {
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(cors(origin))
    this.app.use(compression())
    this.app.use(helmet())
  }

  private configRoutes (): void {
    this.app.use('/api/v1', v1Router)
  }

  private configInvalidRouteHandler (): void {
    this.app.use(invalidRouteHandler)
  }

  private initializeErrorHandling (): void {
    this.app.use(errorMiddleware)
  }

  public start (): void {
    this.app.listen(envs.APP_PORT, () => {
      console.log(`Server running on port ${envs.APP_PORT}`)
    })
  }
}
