<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import type { Ref } from 'vue'
import {
  type Configuration,
  ConfigurationZod,
  type Page,
  type PalettUrl,
  type App,
  type Alert
} from '@/business/model'
import TopBar from 'openbridge-webcomponents-vue/components/top-bar/ObcTopBar'
import NavigationMenu from 'openbridge-webcomponents-vue/components/navigation-menu/ObcNavigationMenu'
import 'openbridge-webcomponents/dist/components/navigation-item/navigation-item.js'
import Obi03Support from 'openbridge-webcomponents-vue/icons/Obi03Support'
import Obi03Settings from 'openbridge-webcomponents-vue/icons/Obi03Settings'
import BrillianceMenu from 'openbridge-webcomponents-vue/components/brilliance-menu/ObcBrillianceMenu'
import AppMenu from 'openbridge-webcomponents-vue/components/app-menu/ObcAppMenu'
import ObcAlertTopbarElement from 'openbridge-webcomponents-vue/components/alert-topbar-element/ObcAlertTopbarElement'

import NotificationMessageItem from 'openbridge-webcomponents-vue/components/notification-message-item/ObcNotificationMessageItem'

import 'openbridge-webcomponents/dist/icons/icon-14-alarm-unack'

import { AlertType } from 'openbridge-webcomponents/dist/types'
import { useRouter } from 'vue-router'
import { useAlertStore } from './stores/alert'
import DemoAlertMenu from './components/DemoAlertMenu.vue'
import { useBridgeStore } from './stores/bridge'

if (import.meta.env.PROD) {
  //@ts-expect-error TS2306
  import('openbridge-webcomponents/dist/icons/index.js')
}

const date = ref(new Date().toISOString())

const alertStore = useAlertStore()
const config = ref<null | Configuration>(null)
const bridgeStore = useBridgeStore()
const router = useRouter()

onMounted(() => {
  // update date every second
  setInterval(() => {
    date.value = new Date().toISOString()
  }, 1000)

  // get all url params
  const urlParams = new URLSearchParams(window.location.search)
  const configUrl = urlParams.get('configUrl') ?? import.meta.env.BASE_URL + 'config.json'
  const randomId = Math.random().toString(36).substring(7)
  const bridgeId = urlParams.get('bridgeId') ?? randomId
  bridgeStore.setBridgeId(bridgeId)

  // load config from url
  fetch(configUrl)
    .then((response) => response.json())
    .then((configData) => {
      config.value = ConfigurationZod.parse(configData)
      app.value = config.value?.apps[0]
      selectedPage.value = config.value?.apps[0].pages[0]
      alertStore.setAlerts(app.value)
    })

  //@ts-expect-error TS2306
  import('openbridge-webcomponents/dist/icons/index.js')
})

function icon2element(icon: string, slot?: string): string {
  icon = 'obi-' + icon
  return `<${icon} slot="${slot}"></${icon}>`
}

const palette = computed(() => bridgeStore.palette)

watch(
  palette,
  (value) => {
    // set data-obc-theme attribute on html element
    document.documentElement.setAttribute('data-obc-theme', value)
  },
  { immediate: true }
)

function onPaletteChange(event: CustomEvent) {
  bridgeStore.setPalette(event.detail.value)
}

function onBrightnessChange(event: CustomEvent) {
  bridgeStore.setBrightness(event.detail.value)
}

const showNavigation = ref(false)
const showBrilliance = ref(false)
const showAppMenu = ref(false)
const showAlertMenu = ref(false)

function toggleAndhideOthers(value: Ref<boolean>) {
  const prevValue = value.value

  showNavigation.value = false
  showBrilliance.value = false
  showAppMenu.value = false
  showAlertMenu.value = false

  value.value = !prevValue
}

function toggleNavigation() {
  toggleAndhideOthers(showNavigation)
}

function toggleBrilliance() {
  toggleAndhideOthers(showBrilliance)
}

function toggleAppMenu() {
  toggleAndhideOthers(showAppMenu)
}

function toggleAlertMenu() {
  toggleAndhideOthers(showAlertMenu)
}

const app = ref<null | App>(null)

const appMenu = ref<null | HTMLElement>(null)

function onAppSelected(selectedApp: App) {
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

function onAlertListClick() {
  showNavigation.value = false
  router.push({ name: 'alert' })
}

const visibleAlert = computed<null | Alert>(() => {
  return alertStore.latestHighestAlert
})

const visibleAlertType = computed<AlertType>(() => {
  if (!visibleAlert.value) {
    return AlertType.None
  }
  if (visibleAlert.value.alertType === 'alarm') {
    return AlertType.Alarm
  }
  if (visibleAlert.value.alertType === 'warning') {
    return AlertType.Warning
  }
  if (visibleAlert.value.alertType === 'caution') {
    return AlertType.Caution
  }
  return AlertType.None
})

function onMuteAlert() {
  if (!visibleAlert.value) {
    return
  }
  visibleAlert.value.alertStatus = 'silenced'
}

function onAckAlert() {
  if (!visibleAlert.value) {
    return
  }
  visibleAlert.value.alertStatus = 'acked'
}
</script>

<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
  <header>
    <TopBar
      :app-title="app?.name"
      :page-name="selectedPage?.name"
      :date="date"
      @menu-button-clicked="toggleNavigation"
      @dimming-button-clicked="toggleBrilliance"
      @apps-button-clicked="toggleAppMenu"
      show-apps-button
      show-dimming-button
      show-clock
      wide-menu-button
    >
      <template #alerts>
        <ObcAlertTopbarElement
          style="width: 500px"
          :n-alerts="alertStore.activeAlerts.length"
          :max-width="500"
          :alert-type="visibleAlertType"
          @alertclick="toggleAlertMenu"
          :show-ack="visibleAlert !== null"
          :alert-muted="visibleAlert?.alertStatus === 'silenced'"
          @muteclick="onMuteAlert"
          @ackclick="onAckAlert"
          @messageclick="toggleAlertMenu"
        >
          <notification-message-item v-if="visibleAlert" :time="visibleAlert.time.toISOString()">
            <obi-14-alarm-unack slot="icon" use-css-color></obi-14-alarm-unack>
            <div slot="message">{{ visibleAlert.cause }}</div>
          </notification-message-item>
        </ObcAlertTopbarElement>
      </template>
    </TopBar>
  </header>
  <main>
    <div class="content">
      <iframe
        :class="{ 'content-iframe': true, 'content-iframe--current': palette === 'bright' }"
        v-if="selectedPage && useIframe"
        :src="selectedPage.url.brightUrl"
        width="100%"
        height="100%"
        frameborder="0"
      ></iframe>
      <iframe
        v-if="selectedPage  && useIframe"
        :class="{ 'content-iframe': true, 'content-iframe--current': palette === 'day' }"
        :src="selectedPage.url.dayUrl"
        width="100%"
        height="100%"
        frameborder="0"
      ></iframe>
      <iframe
        v-if="selectedPage && useIframe"
        :class="{ 'content-iframe': true, 'content-iframe--current': palette === 'dusk' }"
        :src="selectedPage.url.duskUrl"
        width="100%"
        height="100%"
        frameborder="0"
      ></iframe>
      <iframe
        v-if="selectedPage && useIframe"
        :class="{ 'content-iframe': true, 'content-iframe--current': palette === 'night' }"
        :src="selectedPage.url.nightUrl"
        width="100%"
        height="100%"
        frameborder="0"
      ></iframe>
      <router-view v-else></router-view>
      <NavigationMenu v-if="showNavigation && app" class="navigation-menu">
        <obc-navigation-item
          v-for="page in pages"
          :key="page.name + page.url"
          slot="main"
          :checked="selectedPage === page"
          :icon="page.icon"
          :label="page.name"
          @click="onPageClick(page.url, page)"
          v-html="icon2element(page.icon, 'icon')"
        >
        </obc-navigation-item>

        <template #footer>
          <obc-navigation-item label="Help" @click="onPageClick(app.helpPage, null)">
            <obi-03-support slot="icon"></obi-03-support>
          </obc-navigation-item>
          <obc-navigation-item label="Settings" @click="onPageClick(app.configurationPage, null)">
            <obi-03-settings slot="icon"></obi-03-settings>
          </obc-navigation-item>
          <obc-navigation-item label="Alert" @click="onAlertListClick" .href="undefined">
            <obi-14-alerts slot="icon"></obi-14-alerts>
          </obc-navigation-item>
        </template>

        <img name="logo" src="https://via.placeholder.com/320x96" alt="logo" />
      </NavigationMenu>
      <BrillianceMenu
        :palette="palette"
        @palette-changed="onPaletteChange"
        :brightness="bridgeStore.brightness"
        @brightness-changed="onBrightnessChange"
        class="brilliance"
        v-if="showBrilliance"
      >
      </BrillianceMenu>
      <AppMenu class="app-menu" @search="onAppSearchChange" v-if="showAppMenu" ref="appMenu">
        <obc-app-button
          v-for="(a, i) in filteredApps"
          :key="i"
          :icon="a.appIcon"
          :label="a.name"
          @click="() => onAppSelected(a)"
          :checked="a === app"
          v-html="icon2element(a.appIcon, 'icon')"
        >
        </obc-app-button>
      </AppMenu>
      <DemoAlertMenu v-model="showAlertMenu" />
    </div>
  </main>
</template>

<style scoped>
header {
  position: relative;
  z-index: 1;
}

.content {
  isolation: isolate;
  position: absolute;
  top: 48px;
  bottom: 0;
  left: 0;
  right: 0;

  .navigation-menu {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
  }

  .brilliance {
    position: absolute;
    top: 4px;
    right: 48px;
  }

  .app-menu {
    position: absolute;
    top: 4px;
    right: 4px;
  }

  .alert-menu {
    position: absolute;
    top: 4px;
    right: 104px;
  }
}

.content-iframe {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
}

.content-iframe--current {
  z-index: 0;
}
</style>
