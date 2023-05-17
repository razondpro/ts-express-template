/* eslint-disable @typescript-eslint/no-misused-promises */
import { Server } from './shared/infra/http/app'

new Server().start()

async function closeGracefully (signal: any): Promise<void> {
  // await db.close() if we have a db connection in this app
  // await other things we should cleanup nicely
  process.kill(process.pid, signal)
}
process.once('SIGINT', closeGracefully)
process.once('SIGTERM', closeGracefully)
