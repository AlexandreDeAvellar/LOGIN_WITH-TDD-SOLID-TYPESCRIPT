export default {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://mongo:27017/clean-node-api',
  port: process.env.PORT ?? 8060,
  jwtSecret: process.env.JWT_SECRET ?? 'secret_*$#klasdLKJSDg]][asd1$q7A)YDASdhlKAshd'
}
