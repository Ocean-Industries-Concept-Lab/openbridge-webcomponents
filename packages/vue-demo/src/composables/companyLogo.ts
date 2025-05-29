import type { PalettUrl } from '@/business/model'
import { useBridgeStore } from '../stores/bridge'
import { computed } from 'vue'

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

export const useCompanyLogo = () => {
  const bridgeStore = useBridgeStore()
  const companyLogoUrl = computed(() => {
    return palettUrlToUrl(companyLogo, bridgeStore.palette)
  })
  const companyLogoSmallUrl = computed(() => {
    return palettUrlToUrl(companyLogoSmall, bridgeStore.palette)
  })
  return {
    companyLogo: companyLogoUrl,
    companyLogoSmall: companyLogoSmallUrl
  }
}
