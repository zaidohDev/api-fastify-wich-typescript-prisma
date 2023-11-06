import { FastifyRequest, FastifyReply } from 'fastify'
import { CreateCustomerService } from '../service/createCustomerService'

class CreateCustomerController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, email } = request.body as { name: string; email: string }

    const custumerService = new CreateCustomerService()

    const customer = await custumerService.execute({ name, email })

    return reply.code(201).send(customer)
  }
}

export { CreateCustomerController }
