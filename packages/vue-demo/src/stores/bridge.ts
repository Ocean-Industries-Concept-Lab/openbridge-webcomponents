import { defineStore } from 'pinia'
import { db } from '@/plugin/firestore'
import { doc, onSnapshot, setDoc } from 'firebase/firestore'

interface BridgeData {
  palette?: 'day' | 'night' | 'dusk' | 'bright'
  brightness?: number
}

function updatePalette(palette: 'day' | 'night' | 'dusk' | 'bright') {
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
    palette: (state) => state.bridgeData.palette ?? 'day',
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
    setPalette(palette: 'day' | 'night' | 'dusk' | 'bright') {
      updatePalette(palette)
      if (!this.bridgeId) return
      this.bridgeData.palette = palette
      setDoc(doc(db, 'bridges', this.bridgeId), { palette }, { merge: true })
    },
    setBrightness(brightness: number) {
      if (!this.bridgeId) return
      this.bridgeData.brightness = brightness
      setDoc(doc(db, 'bridges', this.bridgeId), { brightness }, { merge: true })
    }
  }
})
