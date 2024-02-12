<script setup lang="ts">
import { onMounted, computed } from 'vue'
import TopBar from '@tibnor/openbridge-webcomponents-vue/components/top-bar/ObcTopBar'
import NavigationMenu from '@tibnor/openbridge-webcomponents-vue/components/navigation-menu/ObcNavigationMenu'
import '@tibnor/openbridge-webcomponents/dist/components/navigation-item/navigation-item.js'
import Obi03Support from '@tibnor/openbridge-webcomponents-vue/icons/Obi03Support'
import Obi03Settings from '@tibnor/openbridge-webcomponents-vue/icons/Obi03Settings'
import BrillianceMenu from '@tibnor/openbridge-webcomponents-vue/components/brilliance-menu/ObcBrillianceMenu'
import AppMenu from '@tibnor/openbridge-webcomponents-vue/components/app-menu/ObcAppMenu'
import ObcAlertTopbarElement from '@tibnor/openbridge-webcomponents-vue/components/alert-topbar-element/ObcAlertTopbarElement'
import ObcAlertButton from '@tibnor/openbridge-webcomponents-vue/components/alert-button/ObcAlertButton'

import NotificationMessageItem from '@tibnor/openbridge-webcomponents-vue/components/notification-message-item/ObcNotificationMessageItem'

import '@tibnor/openbridge-webcomponents/dist/icons/icon-14-alarm-unack'

import { useAlertHandling } from './alert-handling'
import { useRouter } from 'vue-router'
import { useAlertStore } from './stores/alert'
import DemoAlertMenu from './components/DemoAlertMenu.vue'
import { useBridgeStore } from './stores/bridge'
import { useWindowHandling } from './window-handling'
import { useClockHandling } from './clock-handling'
import { useAppHandling } from './apps-handling'

if (import.meta.env.PROD) {
  import('@tibnor/openbridge-webcomponents/dist/icons/index.js')
}

const {
  showNavigation,
  showBrilliance,
  showAppMenu,
  showAlertMenu,
  toggleNavigation,
  toggleBrilliance,
  toggleAppMenu,
  toggleAlertMenu
} = useWindowHandling()
const { visibleAlert, visibleAlertType, onMuteAlert, onAckAlert } = useAlertHandling()
const { date } = useClockHandling()
const {
  app,
  onAppSelected,
  pages,
  selectedPage,
  onPageClick,
  onAppSearchChange,
  filteredApps,
  useIframe
} = useAppHandling({ showAppMenu, showNavigation })

const alertStore = useAlertStore()
const bridgeStore = useBridgeStore()
const router = useRouter()

onMounted(() => {
  // get all url params
  const urlParams = new URLSearchParams(window.location.search)
  const randomId = Math.random().toString(36).substring(7)
  const bridgeId = urlParams.get('bridgeId') ?? randomId
  bridgeStore.setBridgeId(bridgeId)

  import('@tibnor/openbridge-webcomponents/dist/icons/index.js')
})

function icon2element(icon: string, slot?: string): string {
  icon = 'obi-' + icon
  return `<${icon} slot="${slot}"></${icon}>`
}

const palette = computed(() => bridgeStore.palette)

function onPaletteChange(event: CustomEvent) {
  bridgeStore.setPalette(event.detail.value)
}

function onBrightnessChange(event: CustomEvent) {
  bridgeStore.setBrightness(event.detail.value)
}

function onAlertListClick() {
  showNavigation.value = false
  router.push({ name: 'alert' })
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
      :app-button-breakpoint-px="500"
      :dimming-button-breakpoint-px="500"
      :app-title-breakpoint-px="400"
      :clock-minimize-breakpoint-px="300"
    >
      <template #alerts>
        <ObcAlertTopbarElement
          class="alert-large"
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
        <ObcAlertButton
          @click="toggleAlertMenu"
          class="alert-small"
          :alert-type="visibleAlertType"
          :n-alerts="alertStore.activeAlerts.length"
          :counter="alertStore.activeAlerts.length > 0"
          standalone
          slot="alerts"
          style="max-width: 48px"
        >
        </ObcAlertButton>
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
        v-if="selectedPage && useIframe"
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

        <img name="logo" :src="app.companyLogo" alt="logo" />
      </NavigationMenu>
      <BrillianceMenu
        :palette="palette"
        @palette-changed="onPaletteChange"
        :brightness="bridgeStore.brightness"
        @brightness-changed="onBrightnessChange"
        show-auto-brightness
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
    right: 94px;
    width: 500px;
    max-width: calc(100% - 8px);
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

.alert-small {
  display: none;
}

@media screen and (max-width: 850px) {
  .alert-large {
    display: none;
  }

  .alert-small {
    display: revert;
  }
}

@media screen and (max-width: 600px) {
  .alert-menu {
    top: 4px;
    right: 4px;
    left: 4px;
  }
}
</style>
