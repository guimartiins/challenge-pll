import JWTTokenService from './jwt-token.service'

describe('jwt token service unit tests', () => {
  it('should return false if invalid token is provided', async () => {
    const isValid = JWTTokenService.isValid('invalid_token')
    expect(isValid).toBe(false)
  })

  it('should return true if valid token is provided', async () => {
    const payload = {
      id: '123',
      name: 'John Doe',
    }

    const token = await JWTTokenService.generate(payload)

    expect(JWTTokenService.isValid(token)).toBe(true)
  })
})
