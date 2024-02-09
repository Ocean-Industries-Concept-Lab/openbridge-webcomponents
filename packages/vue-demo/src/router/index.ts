import { createRouter, createWebHistory } from 'vue-router'
import AlertList from '../views/AlertList.vue'
import InstrumentDemo from '../views/InstrumentDemo.vue'
import ResponsiveInstrumentDemo from '../views/ResponsiveInstrumentDemo.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'instrument-demo',
      component: InstrumentDemo
    },
    {
      path: '/responsive',
      name: 'responsive-instrument-demo',
      component: ResponsiveInstrumentDemo
    },
    {
      path: '/alert',
      name: 'alert',
      component: AlertList
    }
  ]
})

export default router
