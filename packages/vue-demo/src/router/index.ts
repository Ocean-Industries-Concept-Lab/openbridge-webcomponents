import { createRouter, createWebHistory } from 'vue-router'
import AlertList from '@/views/AlertList.vue'
import ResponsiveInstrumentDemo from '../views/ResponsiveInstrumentDemo.vue'
import LandingView from '../views/LandingView.vue'
import SettingsView from '@/views/SettingsView.vue'
import HelpView from '@/views/HelpView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'instrument-demo',
      component: LandingView,
      meta: {
        title: 'Conning'
      }
    },
    {
      path: '/responsive',
      name: 'responsive-instrument-demo',
      component: ResponsiveInstrumentDemo,
      meta: {
        title: 'Clock'
      }
    },
    {
      path: '/alert',
      name: 'alert',
      component: AlertList,
      meta: {
        title: 'Alerts'
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView,
      meta: {
        title: 'Settings'
      }
    },
    {
      path: '/help',
      name: 'help',
      component: HelpView,
      meta: {
        title: 'Help'
      }
    }
  ]
})

export default router
