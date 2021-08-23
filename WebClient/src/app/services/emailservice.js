import httpservice from './httpservice'

var controller = '/contactdialog/'

function postEmailMessage (email, name, message) {
  return httpservice({
    url: controller + 'PostEmailMessage',
    method: 'POST',
    data: {
      Email: email,
      Name: name,
      Message: message
    }
  })
}

function getEmailMessages () {
  return httpservice({
    url: controller + 'GetEmailMessages',
    method: 'GET'
  })
}

const taskService = {
  getEmailMessages,
  postEmailMessage
}

export default taskService
