<script setup lang="ts">
import { onMounted, computed } from 'vue'
import TopBar from '@tibnor/openbridge-webcomponents-vue/components/top-bar/ObcTopBar'
import NavigationMenu from '@tibnor/openbridge-webcomponents-vue/components/navigation-menu/ObcNavigationMenu'
import '@tibnor/openbridge-webcomponents/dist/components/navigation-item/navigation-item.js'
import Obi03Support from '@tibnor/openbridge-webcomponents-vue/icons/Obi03Support'
import Obi03Settings from '@tibnor/openbridge-webcomponents-vue/icons/Obi03Settings'
import '@tibnor/openbridge-webcomponents/dist/icons/icon-04-dimming'
import '@tibnor/openbridge-webcomponents/dist/icons/icon-01-apps'

import BrillianceMenu from '@tibnor/openbridge-webcomponents-vue/components/brilliance-menu/ObcBrillianceMenu'
import AppMenu from '@tibnor/openbridge-webcomponents-vue/components/app-menu/ObcAppMenu'
import ObcAlertTopbarElement from '@tibnor/openbridge-webcomponents-vue/components/alert-topbar-element/ObcAlertTopbarElement'
import ObcAlertButton from '@tibnor/openbridge-webcomponents-vue/components/alert-button/ObcAlertButton'
import ObcContextMenu from '@tibnor/openbridge-webcomponents-vue/components/context-menu/ObcContextMenu'

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
const {
  app,
  onAppSelected,
  pages,
  selectedPage,
  onPageClick,
  onAppSearchChange,
  filteredApps,
  companyLogo
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
      <NavigationMenu v-show="showNavigation" v-if="app" class="navigation-menu">
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

        <img name="logo" :src="companyLogo" alt="logo" slot="logo" />
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
  overflow: hidden;

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
