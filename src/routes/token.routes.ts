import { Router, type Request, type Response } from 'express'
import JWTTokenService from '../domain/services/jwt-token.service'
import Token from '../domain/entity/token'

const router = Router()

router.post('/token/validate', (req: Request, res: Response) => {
  const valueToken = req.headers.authorization
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!valueToken) {
    return res.status(401).send()
  }

  const token = new Token(valueToken)
  const isValid = JWTTokenService.isValid(token)
  res.status(isValid ? 200 : 401).send({ isValid })
})

export default router
