import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
  type RouteRecordSingleView
} from 'vue-router'
import AlertList from '@/views/AlertList.vue'
import ResponsiveInstrumentDemo from '../views/ResponsiveInstrumentDemo.vue'
import SettingsView from '@/views/SettingsView.vue'
import HelpView from '@/views/HelpView.vue'
import IasView from '@/views/IasView.vue'
import IconList from '@/components/IconList.vue'
import GraphDemo from '@/views/GraphDemo.vue'
import ARView from '@/views/ARView.vue'
import ECDIS from '@/views/ECDIS.vue'
import InstrumentDemo from '@/views/InstrumentDemo.vue'
import OwnShipData from '@/components/OwnShipData.vue'
import WeatherWidget from '@/components/WeatherWidget.vue'
import DepthGraph from '@/components/DepthGraph.vue'
import type { Component } from 'vue'
import AzimuthView from '@/views/small-screen/AzimuthView.vue'
import ScreenControl from '@/views/ScreenControl/ScreenControl.vue'
import type { ScreenPage } from '@/stores/bridge'

export interface App {
  name: string
  appIcon: string
  showTopBar: boolean
  showInCommandMenu: boolean
  path: string
  zoom?: number
  smallScreen?: boolean
  noTopBar?: boolean
  pages: {
    path: string
    name: string
    component: Component
    title: string
    icon: string
    background: string
    props?: Record<string, unknown>
  }[]
}

export const apps: App[] = [
  {
    name: 'Conning',
    appIcon: 'conning-iec',
    showTopBar: true,
    showInCommandMenu: true,
    path: '/conning',
    pages: [
      {
        path: '/',
        name: 'instrument-demo',
        component: InstrumentDemo,
        title: 'Conning',
        background: '--container-background-color',
        icon: 'conning-iec'
      }
    ]
  },
  {
    name: 'ECDIS',
    appIcon: 'ecdis-proposal',
    showTopBar: true,
    showInCommandMenu: false,
    path: '/ecdis',
    pages: [
      {
        path: '',
        name: 'ecdis',
        component: ECDIS,
        title: 'ECDIS',
        background: '--container-background-color',
        icon: 'ecdis-proposal'
      }
    ]
  },
  {
    name: 'Small Screen',
    appIcon: 'screen-pad',
    showTopBar: true,
    showInCommandMenu: false,
    zoom: 1.5,
    path: '/small-screen',
    smallScreen: true,
    pages: [
      {
        path: 'azimuth-thruster',
        name: 'azimuth-thruster',
        component: AzimuthView,
        title: 'Azimuth',
        background: '--container-background-color',
        icon: 'propulsion-azimuth-thruster'
      },
      {
        path: 'own-ship',
        name: 'own-ship',
        component: OwnShipData,
        title: 'Own Ship',
        background: '--container-background-color',
        icon: 'heading-n-up-proposal'
      },

      {
        path: 'depth',
        name: 'depth',
        component: DepthGraph,
        title: 'Depth',
        background: '--container-background-color',
        icon: 'depth',
        props: {
          showRealTimeDepth: true
        }
      },
      {
        path: 'weather',
        name: 'weather-widget',
        component: WeatherWidget,
        title: 'Weather',
        background: '--container-background-color',
        icon: 'weather'
      }
    ]
  },
  {
    name: 'Screen Control',
    appIcon: 'screens',
    showTopBar: true,
    showInCommandMenu: false,
    path: '/screen-control',
    pages: [
      {
        path: 'apps',
        name: 'screen-control-apps',
        component: ScreenControl,
        title: 'Apps',
        background: '--container-background-color',
        icon: 'screen-desk'
      },
      {
        path: 'devices',
        name: 'screen-control-devices',
        component: ScreenControl,
        title: 'Devices',
        background: '--container-background-color',
        icon: 'input-devices-google'
      },
      {
        path: 'dim',
        name: 'screen-control-dim',
        component: ScreenControl,
        title: 'Dim',
        background: '--container-background-color',
        icon: 'palette-dimming'
      }
    ]
  },
  {
    name: 'Icons',
    appIcon: 'placeholder',
    showTopBar: false,
    showInCommandMenu: false,
    path: '/icons',
    noTopBar: true,
    pages: [
      {
        path: '',
        name: 'icon-list',
        component: IconList,
        title: 'Icons',
        background: '--container-background-color',
        icon: 'placeholder'
      }
    ]
  },
  {
    name: 'IAS',
    appIcon: 'ias',
    showTopBar: true,
    showInCommandMenu: false,
    path: '/ias',
    pages: [
      {
        path: '',
        name: 'ias',
        component: IasView,
        title: 'IAS',
        background: '--container-background-color',
        icon: 'ias'
      }
    ]
  },
  {
    name: 'AR',
    appIcon: 'radar-overlay-proposal',
    showTopBar: true,
    showInCommandMenu: false,
    path: '/ar',
    pages: [
      {
        path: '',
        name: 'ar',
        component: ARView,
        title: 'AR',
        background: '--container-background-color',
        icon: 'radar-overlay-proposal'
      }
    ]
  }
]

export const screenPages: { app: string; pages: (ScreenPage & { app: string })[] }[] = apps.map(
  (app) => {
    return {
      app: app.name,
      pages: app.pages.map((page) => {
        let path = app.path
        if (page.path !== '/') {
          path += '/' + page.path
        }
        if (app.path === '/conning') {
          path = '/'
        }
        return {
          app: app.name,
          name: page.title,
          icon: page.icon,
          path: path
        }
      })
    }
  }
)

const routes: RouteRecordRaw[] = apps.map<RouteRecordRaw>((app) => ({
  path: app.path,
  name: app.name,
  meta: {
    app: app
  },
  children: [
    ...app.pages.map<RouteRecordSingleView>((page) => ({
      path: page.path,
      name: page.name,
      component: page.component,
      meta: {
        title: page.title,
        background: page.background,
        icon: page.icon
      },
      props: page.props
    })),
    {
      path: 'alert',
      name: app.name + '-alert',
      component: AlertList,
      meta: {
        title: 'Alerts'
      }
    },
    {
      path: 'settings',
      name: app.name + '-settings',
      component: SettingsView,
      meta: {
        title: 'Settings',
        background: '--container-section-color'
      }
    },
    {
      path: 'help',
      name: app.name + '-help',
      component: HelpView,
      meta: {
        title: 'Help',
        background: '--container-section-color'
      }
    }
  ]
}))

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...routes,
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
      path: '/graph',
      name: 'graph',
      component: GraphDemo,
      meta: {
        title: 'Graph',
        background: '--container-background-color'
      }
    }
  ]
})

export default router
