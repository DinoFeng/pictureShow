const routes = [
  {
    path: '/',
    redirect: '/ui',
  },
  {
    path: '/ui',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/index.vue') }],
  },
  {
    path: '/ui/Browser',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/PictureStage.vue') }],
  },
  {
    path: '/ui/DB',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/PictureTable.vue') }],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/ui/*',
    component: () => import('pages/Error404.vue'),
  },
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  })
}
export default routes
