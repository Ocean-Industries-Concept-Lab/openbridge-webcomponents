<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import DemoRouterLink from './components/DemoRouterLink.vue'

import TopBar from '@oicl/openbridge-webcomponents-vue/components/top-bar/ObcTopBar.vue'
import NavigationMenu from '@oicl/openbridge-webcomponents-vue/components/navigation-menu/ObcNavigationMenu.vue'
import '@oicl/openbridge-webcomponents/dist/components/navigation-item/navigation-item.js'
import '@oicl/openbridge-webcomponents/dist/icons/icon-palette-dimming'
import '@oicl/openbridge-webcomponents/dist/icons/icon-applications'

import BrillianceMenu from '@oicl/openbridge-webcomponents-vue/components/brilliance-menu/ObcBrillianceMenu.vue'
import AppMenu from '@oicl/openbridge-webcomponents-vue/components/app-menu/ObcAppMenu.vue'
import ObcAlertTopbarElement from '@oicl/openbridge-webcomponents-vue/components/alert-topbar-element/ObcAlertTopbarElement.vue'
import ObcAlertButton from '@oicl/openbridge-webcomponents-vue/components/alert-button/ObcAlertButton.vue'
import ObcContextMenu from '@oicl/openbridge-webcomponents-vue/components/context-menu/ObcContextMenu.vue'
import ObcAlertIcon from '@oicl/openbridge-webcomponents-vue/components/alert-icon/ObcAlertIcon.vue'
import ObcVendorButton from '@oicl/openbridge-webcomponents-vue/components/vendor-button/ObcVendorButton.vue'

import NotificationMessageItem from '@oicl/openbridge-webcomponents-vue/components/notification-message-item/ObcNotificationMessageItem.vue'

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
import { useInactivityHandling } from './inactivity-handling'
import { useRoute } from 'vue-router'

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

const { inactive } = useInactivityHandling(30_000)
const { visibleAlert, visibleAlertType, onMuteAlert, onAckAlert } = useAlertHandling({ inactive })
const { date } = useClockHandling()

const alertStore = useAlertStore()
const bridgeStore = useBridgeStore()
const configStore = useConfigStore()
const showTopBar = ref(true)

onMounted(() => {
  // get all url params
  const urlParams = new URLSearchParams(window.location.search)
  const randomId = Math.random().toString(36).substring(7)
  const bridgeId = urlParams.get('bridgeId') ?? randomId
  showTopBar.value = !urlParams.has('hidetopbar')
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

const route = useRoute()

const pageTitle = computed(() => {
  return configStore.pageTitle ?? (route.meta.title as string | undefined) ?? 'OpenBridge'
})

const backgroundColor = computed(() => {
  return (
    configStore.backgroundColor ??
    (route.meta.background as string | undefined) ??
    '--container-backdrop-color'
  )
})

const forceSmallAlert = computed(() => {
  return alertStore.activeAlerts.length === 0 && inactive.value
})
</script>

<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
  <div class="root" :style="`background-color: var(${backgroundColor}) `">
    <header v-if="showTopBar">
      <TopBar :app-title="configStore.appTitle" :page-name="pageTitle" :date="date" show-apps-button show-dimming-button
        show-clock :inactive="inactive" :app-button-breakpoint-px="500" :dimming-button-breakpoint-px="500"
        :app-title-breakpoint-px="400" :clock-minimize-breakpoint-px="300" :menu-button-activated="showNavigation"
        :dimming-button-activated="showBrilliance" :apps-button-activated="showAppMenu"
        :left-more-button-activated="showMoreMenu" @menu-button-clicked="toggleNavigation"
        @dimming-button-clicked="toggleBrilliance" @apps-button-clicked="toggleAppMenu"
        @left-more-button-clicked="toggleMoreMenu">
        <template #alerts>
          <ObcAlertTopbarElement :class="{ 'alert-large': true, 'force-small': forceSmallAlert }" style="width: 500px"
            :n-alerts="alertStore.activeAlerts.length" :max-width="500" :alert-type="visibleAlertType"
            :blink-alarm-value="alertStore.blinkAlarmValue" :blink-warning-value="alertStore.blinkWarningValue"
            :show-ack="visibleAlert !== null" :alert-muted="visibleAlert?.alertStatus === 'silenced'"
            @alertclick="toggleAlertMenu" @muteclick="onMuteAlert" @ackclick="onAckAlert"
            @messageclick="toggleAlertMenu">
            <notification-message-item v-if="visibleAlert" :time="visibleAlert.time.toISOString()">
              <obc-alert-icon slot="icon" name="alarm-unack" .blinkValue="alertStore.blinkAlarmValue"></obc-alert-icon>
              <div slot="message">{{ visibleAlert.cause }}</div>
            </notification-message-item>
          </ObcAlertTopbarElement>
          <ObcAlertButton slot="alerts" :class="{ 'alert-small': true, 'force-small': forceSmallAlert }"
            :alert-type="visibleAlertType" :nAlerts="alertStore.activeAlerts.length"
            :counter="alertStore.activeAlerts.length > 0" :blink-alarm-value="alertStore.blinkAlarmValue"
            :blink-warning-value="alertStore.blinkWarningValue" standalone @click="toggleAlertMenu">
          </ObcAlertButton>
        </template>
      </TopBar>
    </header>
    <main>
      <div class="content" :class="{ 'hide-top-bar': !showTopBar }">
        <router-view></router-view>
        <div v-show="showBackdrop" class="backdrop" @click.stop="hideAll"></div>
        <!-- Use v-show so that company logo is loaded agressively -->
        <NavigationMenu v-show="showNavigation" v-if="!configStore.hasConfig" class="navigation-menu">
          <template #main>
            <DemoRouterLink label="Conning" :to="{ name: 'instrument-demo' }" @click="hideAll()">
              <obi-conning-iec slot="icon"></obi-conning-iec>
            </DemoRouterLink>
            <DemoRouterLink label="Azimuth Clock" :to="{ name: 'responsive-instrument-demo' }" @click="hideAll()">
              <obi-propulsion-azimuth-thruster slot="icon"></obi-propulsion-azimuth-thruster>
            </DemoRouterLink>
            <DemoRouterLink label="Icons" :to="{ name: 'icon-list' }" @click="hideAll()">
              <obi-placeholder slot="icon"></obi-placeholder>
            </DemoRouterLink>
          </template>

          <template #footer>
            <DemoRouterLink label="Help" :to="{ name: 'help' }" @click="hideAll()">
              <obi-support-google slot="icon"></obi-support-google>
            </DemoRouterLink>
            <DemoRouterLink label="Settings" :to="{ name: 'settings' }" @click="hideAll()">
              <obi-settings-iec slot="icon"></obi-settings-iec>
            </DemoRouterLink>
            <DemoRouterLink label="Alert" :to="{ name: 'alert' }" @click="hideAll()">
              <obi-alerts slot="icon"></obi-alerts>
            </DemoRouterLink>
          </template>

          <template #logo>
            <ObcVendorButton :image-src="configStore.companyLogo" alt="Link to Open Industries Concept Lab"
              @click="openVendorLink" />
          </template>
        </NavigationMenu>
        <ConfigNavigationMenu v-show="showNavigation" v-else class="navigation-menu" @close-others="hideAll" />
        <BrillianceMenu v-if="showBrilliance" :palette="palette" :brightness="bridgeStore.brightness"
          show-auto-brightness class="brilliance" @palette-changed="onPaletteChange"
          @brightness-changed="onBrightnessChange">
        </BrillianceMenu>
        <AppMenu v-if="showAppMenu" ref="appMenu" class="app-menu" @search="(e) => (appSearch = e.detail)">
          <obc-app-button v-for="(a, i) in filteredApps" :key="i" :icon="a.appIcon" :label="a.name"
            :checked="a.name === configStore.app.name" @click="() => onAppSelected(a)"
            v-html="icon2element(a.appIcon, { slot: 'icon' })">
          </obc-app-button>
        </AppMenu>
        <DemoAlertMenu v-model="showAlertMenu" />
        <ObcContextMenu v-if="showMoreMenu" class="more-menu">
          <obc-navigation-item label="Dimming" @click="toggleBrilliance">
            <obi-palette-dimming slot="icon"></obi-palette-dimming>
          </obc-navigation-item>
          <obc-navigation-item label="Apps" @click="toggleAppMenu">
            <obi-application slot="icon"></obi-application>
          </obc-navigation-item>
        </ObcContextMenu>
      </div>
    </main>
  </div>
</template>

<style scoped>
.root {
  height: 100%;
  width: 100%;
  background-color: var(--container-backdrop-color);
}

main {
  min-height: calc(100% - 48px);
}

header {
  position: static;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
}

.content {
  isolation: isolate;

  min-height: 100%;

  .backdrop {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .navigation-menu {
    position: absolute;
    top: 48px;
    left: 0;
    bottom: 1px;
  }

  .brilliance {
    position: absolute;
    top: 52px;
    right: 48px;
  }

  .app-menu {
    position: absolute;
    top: 52px;
    right: 4px;
    max-width: calc(100% - 8px);
  }

  .alert-menu {
    position: absolute;
    top: 52px;
    right: 94px;
    width: 500px;
    max-width: calc(100% - 8px);
  }

  .more-menu {
    position: absolute;
    top: 52px;
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

.force-small.alert-large {
  display: none;
}

.force-small.alert-small {
  display: revert;
}

@media screen and (max-width: 600px) {
  .alert-menu {
    top: 4px;
    right: 4px;
    left: 4px;
  }
}
</style>
