import { defineStore } from 'pinia'
import { db } from '@/plugin/firestore'
import { doc, onSnapshot, setDoc } from 'firebase/firestore'

interface BridgeData {
  palette?: 'day' | 'night' | 'dusk' | 'bright'
  brightness?: number
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
        }
      })
    },
    setPalette(palette: 'day' | 'night' | 'dusk' | 'bright') {
      document.documentElement.setAttribute('data-obc-theme', palette)
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
