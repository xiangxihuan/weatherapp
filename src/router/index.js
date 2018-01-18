import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index.vue'

Vue.use(Router)

/**
 * 网站的路由配置，网站的访问地址配置
 */

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    }
  ]
})
