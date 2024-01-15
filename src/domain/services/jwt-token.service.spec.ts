import Token from '../entity/token'
import JWTTokenService from './jwt-token.service'

describe('jwt token service unit tests', () => {
  it('should return false if invalid token is provided', async () => {
    const token = new Token('invalid_token')
    const isValid = JWTTokenService.isValid(token)
    expect(isValid).toBe(false)
  })

  it('should return false if empty string is provided', async () => {
    const token = new Token('')
    const isValid = JWTTokenService.isValid(token)
    expect(isValid).toBe(false)
  })

  it('should return true if valid token is provided', () => {
    const payload = {
      id: '123',
      name: 'John Doe',
    }

    const token = JWTTokenService.generate(payload)

    expect(JWTTokenService.isValid(token)).toBe(true)
  })
})
