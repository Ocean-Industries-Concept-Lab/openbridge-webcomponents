import { ref, type Ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAlertStore } from './stores/alert'
import type { Page, PalettUrl } from './business/model'
import { type Configuration, ConfigurationZod, type App } from '@/business/model'

export function useAppHandling(data: { showAppMenu: Ref<Boolean>; showNavigation: Ref<Boolean> }) {
  const { showAppMenu, showNavigation } = data
  const router = useRouter()
  const alertStore = useAlertStore()

  const app = ref<null | App>(null)
  const config = ref<null | Configuration>(null)

  onMounted(() => {
    // get all url params
    const urlParams = new URLSearchParams(window.location.search)
    const configUrl = urlParams.get('configUrl') ?? import.meta.env.BASE_URL + 'config.json'

    // load config from url
    fetch(configUrl)
      .then((response) => response.json())
      .then((configData) => {
        config.value = ConfigurationZod.parse(configData)
        app.value = config.value?.apps[0]
        selectedPage.value = config.value?.apps[0].pages[0]
        alertStore.setAlerts(app.value)
      })

    import('@tibnor/openbridge-webcomponents/dist/icons/index.js')
  })

  const onAppSelected = (selectedApp: App) => {
    app.value = selectedApp
    selectedPage.value = app.value?.pages[0] ?? null
    showAppMenu.value = false
    appSearch.value = ''
    alertStore.setAlerts(app.value)
  }

  const pages = computed(() => {
    return app.value?.pages
  })

  const selectedPage = ref<null | Page>(null)
  const url = ref<null | PalettUrl>(null)

  function onPageClick(u: PalettUrl, p: Page | null) {
    router.push("/")
    selectedPage.value = p
    url.value = u
    showNavigation.value = false
  }

  const appSearch = ref('')

  function onAppSearchChange(event: CustomEvent) {
    appSearch.value = event.detail as string
  }

  const filteredApps = computed(() => {
    if (!config.value) {
      return []
    }
    return config.value.apps.filter((a) =>
      a.name.toLowerCase().includes(appSearch.value.toLowerCase())
    )
  })

  const useIframe = computed(() => {
    return router.currentRoute.value.path === '/'
  })

  return {
    app,
    onAppSelected,
    pages,
    selectedPage,
    onPageClick,
    onAppSearchChange,
    filteredApps,
    useIframe
  }
}
