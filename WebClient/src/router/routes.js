
const routes = [
  {
    path: '/',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Landing.vue') },
      { path: 'redeem', component: () => import('pages/Redeem.vue') },
      { path: 'selectwatch', component: () => import('pages/SelectWatch.vue') },
      { path: 'collections', component: () => import('pages/Collections-remove.vue') }
    ]
  },
  {
    path: '/g',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'watchpresence', component: () => import('pages/WatchPresence.vue') },
      { path: 'selectwatch', component: () => import('pages/SelectWatch.vue') },
      { path: 'checkout', component: () => import('pages/CheckOut.vue') },
      { path: 'enjoy', component: () => import('pages/Enjoy.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
