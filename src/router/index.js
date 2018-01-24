import Vue from 'vue'
import Router from 'vue-router'
import Lunch from '@/components/Lunch'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Lunch',
      component: Lunch
    }
  ]
})
