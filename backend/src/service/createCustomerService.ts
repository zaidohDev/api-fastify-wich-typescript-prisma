import prismaClient from '../database/prismaClient'

interface ICustomer {
  name: string
  email: string
}
class CreateCustomerService {
  async execute({ name, email }: ICustomer) {
    if (!name || !email) {
      throw new Error('Name invalid!')
    }

    return await prismaClient.customer.create({
      data: {
        name,
        email,
        status: true,
      },
    })
  }
}

export { CreateCustomerService }
