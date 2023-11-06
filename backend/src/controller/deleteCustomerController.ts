import { FastifyRequest, FastifyReply } from 'fastify'
import { DeleteCustomerService } from '../service/deleteCustomerService'

class DeleteCustomerController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.query as { id: string }

    const custumerService = new DeleteCustomerService()

    const response = await custumerService.execute({ id })

    return reply.code(200).send(response)
  }
}

export { DeleteCustomerController }
