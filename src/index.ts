import express from 'express'
import router from './routes/token.routes'

const app = express()
const port = 3000

app.use(router)

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})

export default app
