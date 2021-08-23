import httpservice from './httpservice'

var controller = '/item/'

function getFilters (id) {
  return httpservice({
    url: controller + 'GetFilters',
    method: 'GET',
    params: {
      GuaranteeID: id
    }
  })
}

function getItemsOnHandFiltered (filter) {
  return httpservice({
    url: controller + 'GetItemsOnHandFiltered',
    method: 'GET',
    params: {
      Filter: filter
    }
  })
}

function getPublishedItems (id) {
  return httpservice({
    url: controller + 'GetPublishedItems',
    method: 'GET',
    params: {
      ContactID: id
    }
  })
}

function getItemDetails (id) {
  return httpservice({
    url: controller + 'GetItemDetails',
    method: 'GET',
    params: {
      ItemNo: id
    }
  })
}

const taskService = {
  getFilters,
  getItemsOnHandFiltered,
  getPublishedItems,
  getItemDetails
}

export default taskService
