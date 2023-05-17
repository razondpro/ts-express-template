import 'dotenv/config'

const environment = process.env.NODE_ENV ?? 'development'
const APP_PORT = process.env.APP_PORT ?? 3000
const IS_PROD = environment === 'production'
const IS_DEV = environment === 'development'
const IS_TEST = environment === 'test'

const envs = {
  IS_PROD,
  IS_DEV,
  IS_TEST,
  APP_PORT
}

export {
  envs
}
