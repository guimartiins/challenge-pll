import request from 'supertest'
import JWT from 'jsonwebtoken'
import app from '..'

describe('token routes integration tests', () => {
  it('should return 200 if valid token is provided', async () => {
    const payload = {
      id: '123',
      name: 'John Doe',
    }
    const spy = jest.spyOn(JWT, 'verify')
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    spy.mockReturnValueOnce(payload as any)

    const response = await request(app)
      .post('/token/validate')
      .set('authorization', 'any_token')

    expect(response.status).toBe(200)
    expect(response.body).toEqual({ isValid: true })
  })

  it('should return 401 if no token is provided', async () => {
    const response = await request(app).post('/token/validate')

    expect(response.status).toBe(401)
  })

  it('should return 401 if invalid token is provided', async () => {
    const response = await request(app)
      .post('/token/validate')
      .set('authorization', 'invalid_token')

    expect(response.status).toBe(401)
  })
})
