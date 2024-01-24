import { defineStore } from 'pinia'
import { db } from '@/plugin/firestore'
import { doc, onSnapshot, setDoc } from 'firebase/firestore'

interface BridgeData {
  palette: 'day' | 'night' | 'dusk' | 'bright'
}

export const useBridgeStore = defineStore('bridge', {
  state: () => ({
    bridgeId: null as string | null,
    bridgeData: { palette: 'day' } as BridgeData,
    unsubscribe: () => {}
  }),
  getters: {
    palette: (state) => state.bridgeData.palette
  },
  actions: {
    setBridgeId(bridgeId: string) {
      this.bridgeId = bridgeId
      this.unsubscribe()
      this.unsubscribe = onSnapshot(doc(db, 'bridges', bridgeId), (doc) => {
        const data = doc.data()
        if (!data) {
          this.bridgeData = { palette: 'day' }
        } else {
          this.bridgeData = data as BridgeData
        }
      })
    },
    setPalette(palette: 'day' | 'night' | 'dusk' | 'bright') {
      if (!this.bridgeId) return
      this.bridgeData.palette = palette
      setDoc(doc(db, 'bridges', this.bridgeId), { palette }, { merge: true })
    }
  }
})
