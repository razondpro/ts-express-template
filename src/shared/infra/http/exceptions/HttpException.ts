import { Exception } from 'shared/domain/Exception'

export class HttpException extends Exception {
  public name: string
  public message: string

  protected constructor (message: string) {
    super(message)
    this.name = this.constructor.name
    this.message = message
  }
}
