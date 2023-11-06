import { FastifyRequest, FastifyReply } from 'fastify'
import { ListCustomerService } from '../service/listCustomerService'

class ListCustomerController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const custumerService = new ListCustomerService()

    const customers = await custumerService.execute()

    return reply.code(200).send(customers)
  }
}

export { ListCustomerController }
