import { defineStore } from 'pinia'
import { db } from '@/plugin/firestore'
import { doc, onSnapshot, setDoc } from 'firebase/firestore'
import { ObcPalette } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/brilliance-menu/brilliance-menu'

interface BridgeData {
  palette?: ObcPalette
  brightness?: number
}

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
    bridgeData: {} as BridgeData,
    unsubscribe: () => {}
  }),
  getters: {
    palette: (state): ObcPalette => state.bridgeData.palette ?? ObcPalette.day,
    brightness: (state) => state.bridgeData.brightness ?? 50
  },
  actions: {
    setBridgeId(bridgeId: string) {
      this.bridgeId = bridgeId
      this.unsubscribe()
      this.unsubscribe = onSnapshot(doc(db, 'bridges', bridgeId), (doc) => {
        const data = doc.data()
        if (!data) {
          this.bridgeData = {}
        } else {
          this.bridgeData = data as BridgeData
          updatePalette(data.palette ?? 'day')
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
    }
  }
})
