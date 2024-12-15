import type { App, Configuration, Page, PalettUrl } from '@/business/model'
import { defineStore } from 'pinia'
import { useAlertStore } from './alert'
import { useBridgeStore } from './bridge'

const companyLogo = {
  brightUrl: 'https://openbridge-demo.web.app/companylogo-bright.png',
  dayUrl: 'https://openbridge-demo.web.app/companylogo-day.png',
  duskUrl: 'https://openbridge-demo.web.app/companylogo-dusk.png',
  nightUrl: 'https://openbridge-demo.web.app/companylogo-night.png'
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
  }
}

export const useConfigStore = defineStore('config', {
  state: () => ({
    config: null as null | Configuration,
    app: demoApps[0] as App | DummyApp,
    page: null as null | Page
  }),
  getters: {
    hasConfig: (state) => state.config !== null,
    pages: (state) => {
      if (state.app !== null && 'pages' in state.app) return state.app.pages
      else return []
    },
    apps: (state): DummyApp[] | App[] => state.config?.apps ?? demoApps,
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
    companyLogo: (state) => {
      const bridgeStore = useBridgeStore()
      if (state.app !== null && 'companyLogo' in state.app) {
        return palettUrlToUrl(state.app.companyLogo, bridgeStore.palette)
      }
      return palettUrlToUrl(companyLogo, bridgeStore.palette)
    },
    configPage: (state): Page | null => {
      if (state.app !== null && 'configurationPage' in state.app)
        return {
          name: 'Settings',
          url: state.app.configurationPage,
          icon: '03-settings'
        }
      else return null
    },
    helpPage: (state): Page | null => {
      if (state.app !== null && 'helpPage' in state.app)
        return {
          name: 'Help',
          url: state.app.helpPage,
          icon: '03-support'
        }
      else return null
    }
  },
  actions: {
    setConfig(config: Configuration) {
      this.config = config
      this.selectApp(config.apps[0])
    },
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
