import express from 'express'
import tokenRouter from './routes/token.routes'
import transactionRouter from './routes/transaction.routes'
import { DBConnectionFactory } from './infraestructure/factories'

function bootstrapServer(): { app: any; connection: any } {
  const connection = DBConnectionFactory()

  const app = express()
  app.use(express.json())
  const port = 3000

  app.use(tokenRouter)
  app.use(transactionRouter)

  app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
  })

  return {
    app,
    connection,
  }
}

const { app, connection } = bootstrapServer()

export { app, connection }
