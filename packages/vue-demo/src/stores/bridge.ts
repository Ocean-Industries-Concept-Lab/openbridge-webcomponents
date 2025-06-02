import { defineStore } from 'pinia'
import { db } from '@/plugin/firestore'
import { doc, onSnapshot, setDoc } from 'firebase/firestore'
import { ObcPalette } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/brilliance-menu/brilliance-menu'
import { useRouter, type Router } from 'vue-router';

export interface ScreenPage {
  name: string;
  icon: string;
  path: string;
}

export interface Screen {
  name: string;
  location: "up" | "middle" | "down";
  page: ScreenPage;
  size: "medium" | "large";
}

interface BridgeData {
  palette?: ObcPalette
  brightness?: number
  screens?: Screen[],
  master?: {
    browserId: string
  }
}

const defaultScreens: Screen[] = [
  {
    name: 'U1',
    location: 'up',
    page: {
      name: 'Azimuth Thruster',
      icon: 'propulsion-azimuth-thruster',
      path: '/small-screen/azimuth-thruster'
    },
    size: "medium"
  },
  {
    name: 'U2',
    location: 'up',
    page: {
      name: 'Weather',
      icon: 'weather',
      path: '/small-screen/weather'
    },
    size: "medium"
  },
  {
    name: 'C1',
    location: 'middle',
    page: {
      name: 'ECDIS',
      icon: 'ecdis-proposal',
      path: '/ecdis'
    },
    size: "large"
  },
  {
    name: 'C2',
    location: 'middle',
    page: {
      name: 'Conning',
      icon: 'conning-iec',
      path: '/'
    },
    size: "large"
  },
  {
    name: 'D1',
    location: 'down',
    page: {
      name: 'Screen Control',
      icon: 'screens',
      path: '/screen-control/apps'
    },
    size: "medium"
  },
]

function updatePalette(palette: ObcPalette) {
  document.documentElement.setAttribute('data-obc-theme', palette)
  let tabColor: string
  if (palette === 'night') {
    tabColor = 'rgb(10, 10, 0)'
  } else if (palette === 'dusk') {
    tabColor = 'rgb(38, 38, 38)'
  } else if (palette === 'bright') {
    tabColor = 'rgb(255, 255, 255)'
  } else if (palette === 'day') {
    tabColor = 'rgb(252, 252, 252)'
  } else {
    throw new Error(`Unknown palette: ${palette}`)
  }
  document.querySelector('meta[name="theme-color"]')!.setAttribute('content', tabColor)
}

export const useBridgeStore = defineStore('bridge', {
  state: () => ({
    bridgeId: null as string | null,
    screenName: null as string | null,
    currentPath: null as string | null,
    bridgeData: {} as BridgeData,
    unsubscribe: () => { },
    browserId: Math.random().toString(36).substring(2, 15),
  }),
  getters: {
    palette: (state): ObcPalette => state.bridgeData.palette ?? ObcPalette.day,
    brightness: (state) => state.bridgeData.brightness ?? 50,
    screens: (state) => state.bridgeData.screens ?? defaultScreens,
    screenById: (state) => (id: string) => state.bridgeData.screens?.find(screen => screen.name === id),
    currentScreen: (state) => state.bridgeData.screens?.find(screen => screen.name === state.screenName),
    isMaster: (state) => state.bridgeData.master?.browserId === state.browserId
  },
  actions: {
    setBridgeId(bridgeId: string, screenName: string) {
      this.bridgeId = bridgeId
      this.screenName = screenName
      this.currentPath = null
      this.unsubscribe()
      const router = useRouter()
      this.unsubscribe = onSnapshot(doc(db, 'bridges', bridgeId), (doc) => {
        const data = doc.data()
        if (!data) {
          this.bridgeData = {
            screens: defaultScreens,
            master: {
              browserId: this.browserId,
            }
          }
        } else {
          this.bridgeData = data as BridgeData
          updatePalette(data.palette ?? 'day')
        }
        const screen = this.bridgeData.screens?.find(s => s.name.toLowerCase() === this.screenName?.toLowerCase())
        if (!screen) {
          const newScreen = this.bridgeData.screens?.find(s => s.location === 'middle')
          this.screenName = newScreen?.name ?? null
          this.currentPath = newScreen?.page.path ?? null
        } else if (router && this.currentPath !== screen.page.path) {
          router.push(screen.page.path)
          this.currentPath = screen.page.path
        }
      })
    },
    setPalette(palette: ObcPalette) {
      updatePalette(palette)
      this.bridgeData.palette = palette
      if (!this.bridgeId) return
      setDoc(doc(db, 'bridges', this.bridgeId), { palette }, { merge: true })
    },
    setBrightness(brightness: number) {
      if (!this.bridgeId) return
      this.bridgeData.brightness = brightness
      setDoc(doc(db, 'bridges', this.bridgeId), { brightness }, { merge: true })
    },
    updateScreen(screen: Screen, router?: Router) {
      const index = this.bridgeData.screens?.findIndex(s => s.name === screen.name)
      if (index === undefined) return

      const oldScreen = this.bridgeData.screens![index]
      this.bridgeData.screens![index] = screen

      // Hvis dette er den nåværende skjermen og path har endret seg, oppdater routeren
      if (screen.name === this.screenName && oldScreen.page.path !== screen.page.path && router) {
        router.push(screen.page.path)
      }

      if (!this.bridgeId) return
      setDoc(doc(db, 'bridges', this.bridgeId), { screens: this.bridgeData.screens }, { merge: true })
    },
    setCurrentScreen(screenName: string, router?: Router) {
      this.screenName = screenName
      const screen = this.bridgeData.screens?.find(s => s.name === screenName)
      if (screen && router) {
        router.push(screen.page.path)
      }
    }
  }
})
