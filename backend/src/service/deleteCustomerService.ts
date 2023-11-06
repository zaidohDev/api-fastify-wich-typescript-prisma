import prismaClient from '../database/prismaClient'

interface ICustomer {
  id: string
}
class DeleteCustomerService {
  async execute({ id }: ICustomer) {
    const customer = await prismaClient.customer.findFirst({
      where: {
        id: id,
      },
    })

    if (!customer) {
      throw new Error('Id invalid!')
    }

    await prismaClient.customer.delete({
      where: {
        id: customer.id,
      },
    })
    return { message: 'Customer was removed' }
  }
}

export { DeleteCustomerService }
