import prismaClient from '../database/prismaClient'

class ListCustomerService {
  async execute() {
    return await prismaClient.customer.findMany()
  }
}

export { ListCustomerService }
