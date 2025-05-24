import type { App, Page, PalettUrl } from '@/business/model'
import { defineStore } from 'pinia'
import { useAlertStore } from './alert'
import { useBridgeStore } from './bridge'

const companyLogo = {
  brightUrl: 'https://openbridge-demo.web.app/companylogo-bright.png',
  dayUrl: 'https://openbridge-demo.web.app/companylogo-day.png',
  duskUrl: 'https://openbridge-demo.web.app/companylogo-dusk.png',
  nightUrl: 'https://openbridge-demo.web.app/companylogo-night.png'
}

const companyLogoSmall = {
  brightUrl: '/oicl-bright.svg',
  dayUrl: '/oicl-day.svg',
  duskUrl: '/oicl-dusk.svg',
  nightUrl: '/oicl-night.svg'
}

export interface DummyApp {
  name: string
  appIcon: string
}

const demoApps: DummyApp[] = [
  {
    name: 'Demo',
    appIcon: 'propulsion-azimuth-thruster'
  },
  {
    name: 'Radar',
    appIcon: 'radar-iec'
  },
  {
    name: 'ECDIS',
    appIcon: 'ecdis-proposal'
  },
  {
    name: 'Wiper',
    appIcon: 'wipers'
  }
]

function palettUrlToUrl(palettUrl: PalettUrl, palette: 'day' | 'night' | 'dusk' | 'bright') {
  switch (palette) {
    case 'bright':
      return palettUrl.brightUrl
    case 'day':
      return palettUrl.dayUrl
    case 'dusk':
      return palettUrl.duskUrl
    case 'night':
      return palettUrl.nightUrl
    default:
      console.error('Unknown palette:', palette)
  }
}

export const useConfigStore = defineStore('config', {
  state: () => ({
    app: demoApps[0],
    page: null as null | Page
  }),
  getters: {
    pages: (state) => {
      if (state.app !== null && 'pages' in state.app) return state.app.pages
      else return []
    },
    apps: (): DummyApp[] | App[] => demoApps,
    appTitle: (state) => state.app?.name ?? 'App',
    pageTitle: (state) => {
      if (state.page) return state.page.name
      else {
        return undefined
      }
    },
    backgroundColor: (state) => {
      if (state.page && 'background' in state.page) return state.page.background
      else {
        return undefined
      }
    },
    companyLogo: () => {
      const bridgeStore = useBridgeStore()
      return palettUrlToUrl(companyLogo, bridgeStore.palette)
    },
    companyLogoSmall: () => {
      const bridgeStore = useBridgeStore()
      return palettUrlToUrl(companyLogoSmall, bridgeStore.palette)
    },
  },
  actions: {
    selectApp(app: App | DummyApp) {
      const alertStore = useAlertStore()
      this.app = app
      if ('pages' in app) {
        this.page = app.pages[0]
        alertStore.setAlerts(app)
      }
    },
    selectPage(page: Page) {
      this.page = page
    }
  }
})
