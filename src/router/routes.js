const routes = [
  {
    path: '/',
    redirect: '/ui',
  },
  {
    path: '/ui',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/PictureStage.vue') }],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
]

export default routes