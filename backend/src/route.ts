import {
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply,
  FastifyInstance,
} from 'fastify'
import { CreateCustomerController } from './controller/createCustomerController'
import { ListCustomerController } from './controller/listCustomerController'
import { DeleteCustomerController } from './controller/deleteCustomerController'

export async function routes(
  fastify: FastifyInstance,

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  options: FastifyPluginOptions,
) {
  fastify.get(
    '/customers',
    async (req: FastifyRequest, reply: FastifyReply) => {
      return new ListCustomerController().handle(req, reply)
    },
  )

  fastify.post(
    '/customer',
    async (req: FastifyRequest, reply: FastifyReply) => {
      return new CreateCustomerController().handle(req, reply)
    },
  )

  fastify.delete(
    '/customer',
    async (req: FastifyRequest, reply: FastifyReply) => {
      return new DeleteCustomerController().handle(req, reply)
    },
  )
}
