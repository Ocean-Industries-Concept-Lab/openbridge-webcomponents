import type { App, Configuration, Page, PalettUrl } from '@/business/model'
import { defineStore } from 'pinia'
import { useAlertStore } from './alert'
import { useRoute } from 'vue-router'
import { useBridgeStore } from './bridge'

const companyLogo = {
  "brightUrl": "https://openbridge-demo.web.app/companylogo-bright.png",
  "dayUrl": "https://openbridge-demo.web.app/companylogo-day.png",
  "duskUrl": "https://openbridge-demo.web.app/companylogo-dusk.png",
  "nightUrl": "https://openbridge-demo.web.app/companylogo-night.png"
}

export interface DummyApp {
  name: string;
  appIcon: string;
}

const demoApps: DummyApp[] = [
  {
    "name": "Demo",
    "appIcon": "10-thruster-azimuth",
  }, {
    "name": "Radar",
    "appIcon": "06-radar",
  }, {
    "name": "ECDIS",
    "appIcon": "06-ecdis",
  } , {
    "name": "Wiper",
    "appIcon": "08-wiper"
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
    page: null as null | Page,
  }),
  getters: {
      hasConfig: (state) => state.config !== null,
      pages: (state) =>  {
        if (state.app !== null && 'pages' in state.app)
          return state.app.pages;
        else 
          return []
      },
      apps: (state): DummyApp[] | App[] => state.config?.apps ?? demoApps ,
      appTitle: (state) => state.app?.name ?? 'App',
      pageTitle: (state) => {
        if (state.page)
          return state.page.name;
        else {
          const route = useRoute()
          return (route.meta.title as string | undefined) ?? 'OpenBridge'
        }
      },
      companyLogo: (state) => { 
        const bridgeStore = useBridgeStore();
        if (state.app !== null && 'companyLogo' in state.app) {
          return palettUrlToUrl(state.app.companyLogo, bridgeStore.palette)
        }
        return palettUrlToUrl(companyLogo, bridgeStore.palette)
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
