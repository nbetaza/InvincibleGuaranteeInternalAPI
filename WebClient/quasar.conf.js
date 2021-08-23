// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js

module.exports = function (ctx) {
  var envs = {
    local: {
      API: JSON.stringify('http://localhost:49424'),
      BOLT_PUB_KEY: JSON.stringify('F4XLhmOjNZtJ.vVRm-ijcVF6i.e3939aa7e140878ed6a1b40cbad241d66c13fbeefaa93e8c12a1e29f01e034ee'),
      BOLT_TRACK_JS: JSON.stringify('https://connect-sandbox.bolt.com/track.js'),
      BOLT_CONNECT_JS: JSON.stringify('https://connect-sandbox.bolt.com/connect.js'),
      DEBUG_NAVIGATION: JSON.stringify('true')
    },
    test: {
      API: JSON.stringify('http://testapi.invincibleguarantee.com'),
      BOLT_PUB_KEY: JSON.stringify('F4XLhmOjNZtJ.vVRm-ijcVF6i.e3939aa7e140878ed6a1b40cbad241d66c13fbeefaa93e8c12a1e29f01e034ee'),
      BOLT_TRACK_JS: JSON.stringify('https://connect-sandbox.bolt.com/track.js'),
      BOLT_CONNECT_JS: JSON.stringify('https://connect-sandbox.bolt.com/connect.js'),
      DEBUG_NAVIGATION: JSON.stringify('true')
    },
    testprod: {
      API: JSON.stringify('https://api.invincibleguarantee.com'),
      BOLT_PUB_KEY: JSON.stringify('F4XLhmOjNZtJ.vVRm-ijcVF6i.e3939aa7e140878ed6a1b40cbad241d66c13fbeefaa93e8c12a1e29f01e034ee'),
      BOLT_TRACK_JS: JSON.stringify('https://connect-sandbox.bolt.com/track.js'),
      BOLT_CONNECT_JS: JSON.stringify('https://connect-sandbox.bolt.com/connect.js'),
      DEBUG_NAVIGATION: JSON.stringify('true')
    },
    prod: {
      API: JSON.stringify('https://api.invincibleguarantee.com'),
      BOLT_PUB_KEY: JSON.stringify('7IDu4vFrCB9r.w1BcOV3tnl7G.36f70d960d0c06a825ff509db5c9705732a7f27d10c858f0eccbf6250961ac28'),
      BOLT_TRACK_JS: JSON.stringify('https://connect.bolt.com/track.js'),
      BOLT_CONNECT_JS: JSON.stringify('https://connect.bolt.com/connect.js'),
      DEBUG_NAVIGATION: JSON.stringify('false')
    }
  }
  var buildErr = false
  var buildEnv = envs['prod']
  var buildArgvEnv, patchArg = false

  // From the command line:
  // quasar build --env=(prod, t2...)

  process.argv.forEach(element => {
    var es = element.split('=')
    if (es.length > 1) {
      if (es[0] === '--env') {
        if (es[1].length > 0) buildArgvEnv = es[1]
      }
    }
    if (es.length > 0) if (es[0] === '--patch') patchArg = true
  })

  // Error check

  if (buildArgvEnv !== undefined) {
    if (!(buildArgvEnv in envs)) {
      console.log('Error: --env=' + buildArgvEnv + ' not found!')
      buildErr = true
    }

    if (buildErr) {
      console.log('')
      console.log('Exit: build')
      console.log('Usage: quasar build --env=ENV')
      console.log('Where: --env=' + Object.keys(envs).join(' | '))

      process.exit()
    }

    // Automated project versioning

    if (patchArg) {
      const { exec } = require('child_process')
      const pjson = require('./package.json')
      var fs = require('fs')
      var moment = require('moment')

      exec('npm version patch')

      var jsonv = {
        v: 'v' + pjson.version,
        d: moment().format('MM ddd, YYYY hh:mm:ss a')
      }

      fs.writeFile('src/statics/version.json', JSON.stringify(jsonv), (err) => {
        if (err) console.log(err)
      })
    }

    buildEnv = envs[buildArgvEnv]
  }
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    boot: [
      'axios',
      'vuelidate',
      'smoothscroll'
    ],

    css: [
      'app.styl'
    ],

    extras: [
      // 'ionicons-v4',
      // 'mdi-v3',
      // 'fontawesome-v5',
      // 'eva-icons',
      // 'themify',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      'roboto-font', // optional, you are not bound to it
      'material-icons' // optional, you are not bound to it
    ],

    framework: {
      // iconSet: 'ionicons-v4',
      // lang: 'de', // Quasar language

      // all: true, // --- includes everything; for dev only!

      components: [
        'QLayout',
        'QHeader',
        'QDrawer',
        'QPageContainer',
        'QPage',
        'QToolbar',
        'QToolbarTitle',
        'QBtn',
        'QIcon',
        'QList',
        'QItem',
        'QItemSection',
        'QItemLabel',
        'QField',
        'QInput',
        'QAvatar',
        'QChip',
        'QCard',
        'QCardSection',
        'QCardActions',
        'QDialog',
        'QSpace',
        'QPopupProxy',
        'QDate',
        'QTimeline',
        'QTimelineEntry',
        'QTabs',
        'QTab',
        'QTabPanel',
        'QTabPanels',
        'QRouteTab',
        'QSplitter',
        'QImg',
        'QSeparator',
        'QFooter',
        'QRouteTab',
        'QResizeObserver',
        'QScrollArea',
        'QPageSticky',
        'QScrollObserver',
        'QBadge',
        'QExpansionItem',
        'QPullToRefresh',
        'QBtnDropdown',
        'QCheckbox',
        'QStepper',
        'QStep',
        'QStepperNavigation',
        'QExpansionItem',
        'QSpinner',
        'QVideo',
        'QSelect'
      ],

      directives: [
        'Ripple',
        'ClosePopup'
      ],

      // Quasar plugins
      plugins: [
        'Notify',
        'Loading',
        'Dialog'
      ]
    },

    supportIE: false,

    build: {
      env: buildEnv,
      distDir: '../staticserver/wwwroot',
      scopeHoisting: true,
      // vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack (cfg) {
        /* cfg.output = {
          globalObject: 'this'
        } */
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        })
      }
    },

    devServer: {
      // https: true,
      // port: 8080,
      open: true // opens browser window automatically
    },

    animations: 'all', // --- includes all animations
    // animations: [],

    ssr: {
      pwa: false
    },

    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {}, // only for NON InjectManifest
      manifest: {
        // name: 'Invicta Loyalty',
        // short_name: 'Invicta Loyalty',
        // description: 'Invicta Loyalty Application',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },

    cordova: {
      // id: 'is.tenging.invicta',
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    electron: {
      // bundler: 'builder', // or 'packager'

      extendWebpack (cfg) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      },

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'invicta'
      }
    }
  }
}
