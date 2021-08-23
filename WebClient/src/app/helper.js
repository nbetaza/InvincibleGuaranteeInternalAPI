import axios from 'axios'

function preloadImage (src) {
  return new Promise((resolve, reject) => {
    var img = new Image()

    img.onload = () => {
      resolve()
    }

    img.src = src
  })
}

function isMobile () {
  if (screen.width <= 760) {
    return true
  } else {
    return false
  }
}

function getWebBrowser () {
  // Opera 8.0+
  var isOpera = (!!window.opr && !!window.opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0

  // Firefox 1.0+
  var isFirefox = typeof InstallTrigger !== 'undefined'

  // Safari 3.0+ "[object HTMLElementConstructor]"
  var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === '[object SafariRemoteNotification]' })(!window['safari'] || (typeof safari !== 'undefined' && window.safari.pushNotification))

  // Internet Explorer 6-11
  var isIE = false || !!document.documentMode

  // Edge 20+
  var isEdge = !isIE && !!window.StyleMedia

  // Chrome 1 - 71
  var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime)

  // Blink engine detection
  var isBlink = (isChrome || isOpera) && !!window.CSS

  return {
    isOpera,
    isFirefox,
    isSafari,
    isIE,
    isEdge,
    isChrome,
    isBlink
  }
}

function getAppVersion () {
  return new Promise(function (resolve, reject) {
    axios.get('/statics/version.json')
      .then(function (response) {
        // handle success
        console.log(response)
        resolve(response.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
        reject(error)
      })
  })
}

const helper = {
  preloadImage,
  isMobile,
  getWebBrowser,
  getAppVersion
}

export default helper
