import httpservice from './httpservice'

var controller = '/customer/'

function login (id) {
  return httpservice({
    url: controller + 'Login',
    method: 'GET',
    params: {
      GuaranteeID: id
    }
  })
}

function getGuaranteeByID (id) {
  return httpservice({
    url: controller + 'GetGuaranteeByID',
    method: 'GET',
    params: {
      GuaranteeID: id
    }
  })
}

function setWatchPresentOrNot (id, isPresence) {
  return httpservice({
    url: controller + 'setWatchPresentOrNot',
    method: 'GET',
    params: {
      GuaranteeID: id,
      WatchPresentOrNot: isPresence
    }
  })
}

function setSendingStatus (id, status) {
  return httpservice({
    url: controller + 'SetSendingStatus',
    method: 'GET',
    params: {
      GuaranteeID: id,
      Status: status
    }
  })
}

function setSelectedWatchbyGuaranteeID (id, model, price, name) {
  return httpservice({
    url: controller + 'setSelectedWatchbyGuaranteeID',
    method: 'GET',
    params: {
      GuaranteeID: id,
      ModelID: model,
      Price: price,
      Name: name
    }
  })
}

function getBackByGuaranteeID (id) {
  return httpservice({
    url: controller + 'GetBackByGuaranteeID',
    method: 'GET',
    params: {
      GuaranteeID: id
    }
  })
}

function getNextByGuaranteeID (id) {
  return httpservice({
    url: controller + 'GetNextByGuaranteeID',
    method: 'GET',
    params: {
      GuaranteeID: id
    }
  })
}

function getAddressByZip (id) {
  return httpservice({
    url: controller + 'GetAddressByZip',
    method: 'GET',
    params: {
      Code: id
    }
  })
}

function createShipmentLabel (id) {
  return httpservice({
    url: controller + 'CreateShipmentLabel',
    method: 'GET',
    params: {
      GuaranteeID: id
    }
  })
}

function setAddressbyGuaranteeID (mb) {
  return httpservice({
    url: controller + 'SetAddressbyGuaranteeID',
    method: 'POST',
    data: mb
  })
}

function setOutboundStatus (id, status) {
  return httpservice({
    url: controller + 'SetOutboundStatus',
    method: 'GET',
    params: {
      GuaranteeID: id,
      Status: status
    }
  })
}

const taskService = {
  login,
  getGuaranteeByID,
  setWatchPresentOrNot,
  setSelectedWatchbyGuaranteeID,
  getAddressByZip,
  setAddressbyGuaranteeID,
  getBackByGuaranteeID,
  createShipmentLabel,
  getNextByGuaranteeID,
  setSendingStatus,
  setOutboundStatus
}

export default taskService
