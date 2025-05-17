import { createRouter, createWebHistory } from 'vue-router'
import AlertList from '@/views/AlertList.vue'
import ResponsiveInstrumentDemo from '../views/ResponsiveInstrumentDemo.vue'
import LandingView from '../views/LandingView.vue'
import SettingsView from '@/views/SettingsView.vue'
import HelpView from '@/views/HelpView.vue'
import IasView from '@/views/IasView.vue'
import IconList from '@/components/IconList.vue'
import GraphDemo from '@/views/GraphDemo.vue'
import ARView from '@/views/ARView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'instrument-demo',
      component: LandingView,
      meta: {
        title: 'Conning',
        background: '--container-background-color'
      }
    },
    {
      path: '/responsive',
      name: 'responsive-instrument-demo',
      component: ResponsiveInstrumentDemo,
      meta: {
        title: 'Clock',
        background: '--container-background-color'
      }
    },
    {
      path: '/ias',
      name: 'ias',
      component: IasView,
      meta: {
        title: 'IAS',
        background: '--container-background-color'
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
        title: 'Settings',
        background: '--container-section-color'
      }
    },
    {
      path: '/help',
      name: 'help',
      component: HelpView,
      meta: {
        title: 'Help',
        background: '--container-section-color'
      }
    },
    {
      path: '/icons',
      name: 'icon-list',
      component: IconList,
      meta: {
        title: 'Icons',
        background: '--container-background-color'
      }
    },
    {
      path: '/graph',
      name: 'graph',
      component: GraphDemo,
      meta: {
        title: 'Graph',
        background: '--container-background-color'
      }
    },
    {
      path: '/ar',
      name: 'ar',
      component: ARView,
      meta: {
        title: 'AR',
        background: '--container-background-color'
      }
    }
  ]
})

export default router
