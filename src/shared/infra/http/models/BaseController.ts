
import { type Request, type Response } from 'express'
import { HttpStatusCode } from '../HttpStatusCode'

export interface ApiResponse {
  status: number
  message: string
  data?: any
  error?: any
}

export abstract class BaseController {
  protected abstract executeImpl (req: Request, res: Response): Promise<any>

  public async execute (req: Request, res: Response): Promise<void> {
    try {
      await this.executeImpl(req, res)
    } catch (err) {
      console.log('[BaseController]: Uncaught controller error')
      console.log(err)
      this.fail(res, 'An unexpected error occurred')
    }
  }

  private jsonResponse (res: Response, apiResponse: ApiResponse): Response {
    res.type('application/json')
    return res.status(apiResponse.status).json(apiResponse)
  }

  public ok (res: Response, data?: any): Response {
    return this.jsonResponse(res, {
      status: HttpStatusCode.OK,
      message: 'Success',
      data
    })
  }

  public fail (res: Response, error?: any): Response {
    return this.jsonResponse(res,
      {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        error
      })
  }

  public created (res: Response, data?: any): Response {
    return this.jsonResponse(res,
      {
        status: HttpStatusCode.CREATED,
        message: 'Created',
        data
      })
  }

  public clientError (res: Response, error?: any): Response {
    return this.jsonResponse(res, {
      status: HttpStatusCode.BAD_REQUEST,
      message: 'Bad request',
      error
    })
  }

  public unauthorized (res: Response, error?: any): Response {
    return this.jsonResponse(res, {
      status: HttpStatusCode.UNAUTHORIZED,
      message: 'Unauthorized',
      error
    })
  }

  public forbidden (res: Response, error?: any): Response {
    return this.jsonResponse(res, {
      status: HttpStatusCode.FORBIDDEN,
      message: 'Forbidden',
      error
    })
  }

  public notFound (res: Response, error?: any): Response {
    return this.jsonResponse(res, {
      status: HttpStatusCode.NOT_FOUND,
      message: 'Not found',
      error
    })
  }

  public conflict (res: Response, error?: any): Response {
    return this.jsonResponse(res, {
      status: HttpStatusCode.CONFLICT,
      message: 'Conflict',
      error
    })
  }

  public tooMany (res: Response, error?: any): Response {
    return this.jsonResponse(res, {
      status: HttpStatusCode.TOO_MANY_REQUESTS,
      message: 'Too many requests',
      error
    })
  }
}
