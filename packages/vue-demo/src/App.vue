<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import DemoRouterLink from './components/DemoRouterLink.vue'

import TopBar from '@oicl/openbridge-webcomponents-vue/components/top-bar/ObcTopBar'
import NavigationMenu from '@oicl/openbridge-webcomponents-vue/components/navigation-menu/ObcNavigationMenu'
import '@oicl/openbridge-webcomponents/dist/components/navigation-item/navigation-item.js'
import Obi03Support from '@oicl/openbridge-webcomponents-vue/icons/Obi03Support'
import Obi03Settings from '@oicl/openbridge-webcomponents-vue/icons/Obi03Settings'
import '@oicl/openbridge-webcomponents/dist/icons/icon-04-dimming'
import '@oicl/openbridge-webcomponents/dist/icons/icon-01-apps'

import BrillianceMenu from '@oicl/openbridge-webcomponents-vue/components/brilliance-menu/ObcBrillianceMenu'
import AppMenu from '@oicl/openbridge-webcomponents-vue/components/app-menu/ObcAppMenu'
import ObcAlertTopbarElement from '@oicl/openbridge-webcomponents-vue/components/alert-topbar-element/ObcAlertTopbarElement'
import ObcAlertButton from '@oicl/openbridge-webcomponents-vue/components/alert-button/ObcAlertButton'
import ObcContextMenu from '@oicl/openbridge-webcomponents-vue/components/context-menu/ObcContextMenu'
import ObcAlertIcon from '@oicl/openbridge-webcomponents-vue/components/alert-icon/ObcAlertIcon'
import ObcVendorButton from '@oicl/openbridge-webcomponents-vue/components/vendor-button/ObcVendorButton'

import NotificationMessageItem from '@oicl/openbridge-webcomponents-vue/components/notification-message-item/ObcNotificationMessageItem'

import '@oicl/openbridge-webcomponents/dist/icons/icon-14-alarm-unack'

import { useAlertHandling } from './alert-handling'
import { useAlertStore } from './stores/alert'
import DemoAlertMenu from './components/DemoAlertMenu.vue'
import { useBridgeStore } from './stores/bridge'
import { useWindowHandling } from './window-handling'
import { useClockHandling } from './clock-handling'
import ConfigNavigationMenu from './components/ConfigNavigationMenu.vue'
import { useConfigStore, type DummyApp } from './stores/config'
import { ConfigurationZod, type App } from './business/model'
import { simulatedAlerts, startAlerts } from './business/default-alarms'
import { icon2element } from './business/icon2element'

if (import.meta.env.PROD) {
  import('@oicl/openbridge-webcomponents/dist/icons/index.js')
}

const {
  showNavigation,
  showBrilliance,
  showAppMenu,
  showAlertMenu,
  showMoreMenu,
  showBackdrop,
  hideAll,
  toggleNavigation,
  toggleBrilliance,
  toggleAppMenu,
  toggleAlertMenu,
  toggleMoreMenu
} = useWindowHandling()

const { visibleAlert, visibleAlertType, onMuteAlert, onAckAlert } = useAlertHandling()
const { date } = useClockHandling()

const alertStore = useAlertStore()
const bridgeStore = useBridgeStore()
const configStore = useConfigStore()

onMounted(() => {
  // get all url params
  const urlParams = new URLSearchParams(window.location.search)
  const randomId = Math.random().toString(36).substring(7)
  const bridgeId = urlParams.get('bridgeId') ?? randomId
  bridgeStore.setBridgeId(bridgeId)

  const configUrl = urlParams.get('configUrl')
  if (configUrl) {
    // load config from url
    fetch(configUrl)
      .then((response) => response.json())
      .then(ConfigurationZod.parse)
      .then((configData) => {
        configStore.setConfig(configData)
      })
  } else {
    alertStore.setAlerts({ startAlerts, simulatedAlerts })
  }

  import('@oicl/openbridge-webcomponents/dist/icons/index.js')
})

const palette = computed(() => bridgeStore.palette)

function onPaletteChange(event: CustomEvent) {
  bridgeStore.setPalette(event.detail.value)
}

function onBrightnessChange(event: CustomEvent) {
  bridgeStore.setBrightness(event.detail.value)
}

const appSearch = ref('')
const onAppSelected = (selectedApp: App | DummyApp) => {
  configStore.selectApp(selectedApp)
  hideAll()
  appSearch.value = ''
}
const filteredApps = computed(() => {
  return configStore.apps.filter((app) =>
    app.name.toLowerCase().includes(appSearch.value.toLowerCase())
  )
})

function openVendorLink() {
  window.open('https://www.oicl.no/', '_blank')
}
</script>

<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
  <header>
    <TopBar
      :app-title="configStore.appTitle"
      :page-name="configStore.pageTitle"
      :date="date"
      @menu-button-clicked="toggleNavigation"
      @dimming-button-clicked="toggleBrilliance"
      @apps-button-clicked="toggleAppMenu"
      @left-more-button-clicked="toggleMoreMenu"
      show-apps-button
      show-dimming-button
      show-clock
      :app-button-breakpoint-px="500"
      :dimming-button-breakpoint-px="500"
      :app-title-breakpoint-px="400"
      :clock-minimize-breakpoint-px="300"
      :menu-button-activated="showNavigation"
      :dimming-button-activated="showBrilliance"
      :apps-button-activated="showAppMenu"
      :left-more-button-activated="showMoreMenu"
    >
      <template #alerts>
        <ObcAlertTopbarElement
          class="alert-large"
          style="width: 500px"
          :n-alerts="alertStore.activeAlerts.length"
          :max-width="500"
          :alert-type="visibleAlertType"
          :blink-alarm-value="alertStore.blinkAlarmValue"
          :blink-warning-value="alertStore.blinkWarningValue"
          @alertclick="toggleAlertMenu"
          :show-ack="visibleAlert !== null"
          :alert-muted="visibleAlert?.alertStatus === 'silenced'"
          @muteclick="onMuteAlert"
          @ackclick="onAckAlert"
          @messageclick="toggleAlertMenu"
        >
          <notification-message-item v-if="visibleAlert" :time="visibleAlert.time.toISOString()">
            <obc-alert-icon
              slot="icon"
              name="alarm-unack"
              .blinkValue="alertStore.blinkAlarmValue"
            ></obc-alert-icon>
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
        >
        </ObcAlertButton>
      </template>
    </TopBar>
  </header>
  <main>
    <div class="content">
      <router-view></router-view>
      <div class="backdrop" v-show="showBackdrop" @click.stop="hideAll"></div>
      <!-- Use v-show so that company logo is loaded agressively -->
      <NavigationMenu v-show="showNavigation" v-if="!configStore.hasConfig" class="navigation-menu">
        <template #main>
          <DemoRouterLink label="Conning" :to="{ name: 'instrument-demo' }" @click="hideAll()">
            <obi-06-conning slot="icon"></obi-06-conning>
          </DemoRouterLink>
          <DemoRouterLink
            label="Azimuth Clock"
            :to="{ name: 'responsive-instrument-demo' }"
            @click="hideAll()"
          >
            <obi-10-thruster-azimuth slot="icon"></obi-10-thruster-azimuth>
          </DemoRouterLink>
        </template>

        <template #footer>
          <DemoRouterLink label="Help" :to="{ name: 'help' }" @click="hideAll()">
            <obi-03-support slot="icon"></obi-03-support>
          </DemoRouterLink>
          <DemoRouterLink label="Settings" :to="{ name: 'settings' }" @click="hideAll()">
            <obi-03-settings slot="icon"></obi-03-settings>
          </DemoRouterLink>
          <DemoRouterLink label="Alert" :to="{ name: 'alert' }" @click="hideAll()">
            <obi-14-alerts slot="icon"></obi-14-alerts>
          </DemoRouterLink>
        </template>

        <template #logo>
          <ObcVendorButton
            :image-src="configStore.companyLogo"
            alt="Link to Open Industries Concept Lab"
            @click="openVendorLink"
          />
        </template>
      </NavigationMenu>
      <ConfigNavigationMenu
        v-show="showNavigation"
        v-else
        class="navigation-menu"
        @close-others="hideAll"
      />
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
      <AppMenu
        class="app-menu"
        @search="(e) => (appSearch = e.detail)"
        v-if="showAppMenu"
        ref="appMenu"
      >
        <obc-app-button
          v-for="(a, i) in filteredApps"
          :key="i"
          :icon="a.appIcon"
          :label="a.name"
          @click="() => onAppSelected(a)"
          :checked="a.name === configStore.app.name"
          v-html="icon2element(a.appIcon, 'icon')"
        >
        </obc-app-button>
      </AppMenu>
      <DemoAlertMenu v-model="showAlertMenu" />
      <ObcContextMenu v-if="showMoreMenu" class="more-menu">
        <obc-navigation-item label="Dimming" @click="toggleBrilliance">
          <obi-04-dimming slot="icon"></obi-04-dimming>
        </obc-navigation-item>
        <obc-navigation-item label="Apps" @click="toggleAppMenu">
          <obi-01-apps slot="icon"></obi-01-apps>
        </obc-navigation-item>
      </ObcContextMenu>
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

  .backdrop {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

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
    max-width: calc(100% - 8px);
  }

  .alert-menu {
    position: absolute;
    top: 4px;
    right: 94px;
    width: 500px;
    max-width: calc(100% - 8px);
  }

  .more-menu {
    position: absolute;
    top: 4px;
    right: 4px;
    display: none;
  }

  @media screen and (max-width: 500px) {
    .more-menu {
      display: revert;
    }

    .brilliance {
      right: 4px;
    }
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
