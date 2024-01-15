import JWT from 'jsonwebtoken'
import Token from '../entity/token'

export default class JWTTokenService {
  static isValid(token: Token): boolean {
    try {
      JWT.verify(token.value, 'secret')
      return true
    } catch (error) {
      return false
    }
  }

  static generate(payload: Record<string, unknown>): Token {
    const value = JWT.sign(payload, 'secret', { expiresIn: '1h' })
    return new Token(value)
  }
}
