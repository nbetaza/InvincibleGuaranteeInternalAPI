import httpservice from './httpservice'

var controller = 'api/bolt/'

function createOrder (id, no, name, price) {
  return httpservice({
    url: controller + 'CreateOrder',
    method: 'GET',
    params: {
      GuaranteeID: id
    }
  })
}

const taskService = {
  createOrder
}

export default taskService
