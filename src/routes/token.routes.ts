import { Router, type Request, type Response } from 'express'
import JWTTokenService from '../services/jwt-token.service'

const router = Router()

router.post('/token/validate', (req: Request, res: Response) => {
  const token = req.headers.authorization
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!token) {
    return res.status(401).send()
  }
  const isValid = JWTTokenService.isValid(token)
  res.status(isValid ? 200 : 401).send({ isValid })
})

export default router
