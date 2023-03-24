import { FastifyInstance } from 'fastify'
import { authenticateController } from './authenticate'
import { profile } from './profile'
import { registerController } from './register'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { refreshController } from './refresh'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', registerController)

  app.post('/sessions', authenticateController)

  app.patch('/token/refresh', refreshController)

  /** Authenticated */
  app.get('/me', { onRequest: [verifyJwt] }, profile)
}
