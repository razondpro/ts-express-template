/* eslint-disable @typescript-eslint/no-floating-promises */
import express from 'express'

// EXAMPLE
// import { createUserController } from '../../../application/usecases/createUser'

const userRouter = express.Router()

/*
EXAMPLE

userRouter.post('/', (req, res) => {
  createUserController.execute(req, res)
})
*/
export { userRouter }
