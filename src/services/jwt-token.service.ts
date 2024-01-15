import JWT from 'jsonwebtoken'

export default class JWTTokenService {
  static isValid(token: string): boolean {
    try {
      JWT.verify(token, 'secret')
      return true
    } catch (error) {
      return false
    }
  }

  static async generate(payload: Record<string, unknown>): Promise<string> {
    return JWT.sign(payload, 'secret', { expiresIn: '1h' })
  }
}
