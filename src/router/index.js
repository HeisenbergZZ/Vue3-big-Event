import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/modules/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') }, //登录页
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/article/manage', //重定向到文章管理
      children: [
        { path: '/article/manage', component: () => import('@/views/article/ArticleManage.vue') }, //文章管理
        { path: '/article/channel', component: () => import('@/views/article/ArticleChannel.vue') }, //文章频道
        { path: '/user/profile', component: () => import('@/views/user/UserProfile.vue') }, //用户信息
        { path: '/user/avatar', component: () => import('@/views/user/UserAvatar.vue') }, //头像
        { path: '/user/password', component: () => import('@/views/user/UserPassword.vue') }, //密码
      ],
    },
  ],
})
//登录访问拦截 =>默认直接放行
router.beforeEach((to) => {
  //如果没有token,且访问的是非登录页,则跳转到登录页
  const userStore = useUserStore()
  //一定要在守卫中定义store
  if (!userStore.token && to.path !== '/login') {
    return '/login'
  } else {
    return true //return true 放行
  }
})
export default router
