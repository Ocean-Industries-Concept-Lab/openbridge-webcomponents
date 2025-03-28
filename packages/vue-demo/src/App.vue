<script setup lang="ts">
import { onMounted, computed, ref, watch } from 'vue'
import DemoRouterLink from './components/DemoRouterLink.vue'

import TopBar from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/top-bar/ObcTopBar.vue'
import NavigationMenu from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/navigation-menu/ObcNavigationMenu.vue'
import ObcNavigationItemGroup from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/navigation-item-group/ObcNavigationItemGroup.vue'
import ObcNavigationItem from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/navigation-item/ObcNavigationItem.vue'
import { ObcNavigationMenuVariant } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/navigation-menu/navigation-menu'
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/navigation-item/navigation-item.js'
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-palette-dimming'
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-applications'
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-diagnostic-google'
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-placeholder'
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ias'
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sensor-gps-bad'
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-conning-iec'
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-propulsion-azimuth-thruster'
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-support-google'

import BrillianceMenu from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/brilliance-menu/ObcBrillianceMenu.vue'
import AppMenu from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/app-menu/ObcAppMenu.vue'
import ObcAlertButton from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/alert-button/ObcAlertButton.vue'
import ObcContextMenu from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/context-menu/ObcContextMenu.vue'
import ObcAlertIcon from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/alert-icon/ObcAlertIcon.vue'
import { AlertIconName } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/alert-icon/alert-icon'
import ObcVendorButton from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/vendor-button/ObcVendorButton.vue'

import ObcNotificationMessage from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/notification-message/ObcNotificationMessage.vue'

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
import { useDemoConfigStore } from './stores/demoConfig'
import { ObcNotificationMessageAction } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/notification-message/notification-message'
import { ObcAlertButtonType } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/alert-button/alert-button'

if (import.meta.env.PROD) {
  import('@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/index.js')
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
const { visibleAlert, visibleAlertType, silenced, onMuteAlert, onAckAlert } = useAlertHandling()
const { date } = useClockHandling()

const alertStore = useAlertStore()
const bridgeStore = useBridgeStore()
const configStore = useConfigStore()
const demoConfigStore = useDemoConfigStore()
const showTopBar = ref(true)

watch(
  () => demoConfigStore.componentSize,
  (newSize) => {
    const root = document.querySelector('.root')
    console.log('root', root, newSize)
    if (root) {
      root.classList.remove(
        'obc-component-size-regular',
        'obc-component-size-medium',
        'obc-component-size-large',
        'obc-component-size-xl'
      )
      root.classList.add(`obc-component-size-${newSize}`)
    }
  },
  { immediate: true }
)

watch(
  () => inactive,
  (newInactive) => {
    if (newInactive) {
      hideAll()
    }
  }
)

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

  document
    .querySelector('.root')!
    .classList.add(`obc-component-size-${demoConfigStore.componentSize}`)

  import('@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/index.js')
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
      <TopBar
        class="topbar"
        :app-title="configStore.appTitle"
        :page-name="pageTitle"
        :date="date"
        show-apps-button
        show-dimming-button
        show-clock
        :inactive="inactive"
        :app-button-breakpoint-px="500"
        :dimming-button-breakpoint-px="500"
        :app-title-breakpoint-px="400"
        :clock-minimize-breakpoint-px="300"
        :menu-button-activated="showNavigation"
        :dimming-button-activated="showBrilliance"
        :apps-button-activated="showAppMenu"
        :left-more-button-activated="showMoreMenu"
        @menu-button-clicked="toggleNavigation"
        @dimming-button-clicked="toggleBrilliance"
        @apps-button-clicked="toggleAppMenu"
        @left-more-button-clicked="toggleMoreMenu"
      >
        <template #alerts>
          <ObcNotificationMessage
            :class="{ 'alert-large': true, 'force-small': forceSmallAlert }"
            @action-click="onAckAlert"
            @message-click="toggleAlertMenu"
            :action="ObcNotificationMessageAction.TextButton"
            :empty="alertStore.activeAlerts.length === 0"
          >
            <template v-if="visibleAlert">
              <obc-alert-icon slot="primary-icon" :name="AlertIconName.AlarmUnack"></obc-alert-icon>
              <obi-sensor-gps-bad slot="secondary-icon"></obi-sensor-gps-bad>
              <div slot="title">{{ visibleAlert.cause }}</div>
              <div slot="description">{{ visibleAlert.description }}</div>
              <div slot="time">{{ visibleAlert.time.toLocaleTimeString('en-GB') }}</div>
              <div slot="action-text">ACK</div>
            </template>
            <template #empty>No active messages</template>
          </ObcNotificationMessage>
          <ObcAlertButton
            slot="alerts"
            class="alert-button"
            :alert-type="visibleAlertType"
            :type="forceSmallAlert ? ObcAlertButtonType.Flat : ObcAlertButtonType.Normal"
            :nAlerts="alertStore.activeAlerts.length"
            counter
            showSilenceButton
            blinking
            :silence-button-disabled="silenced"
            @click-alert="toggleAlertMenu"
            @click-silence="onMuteAlert"
          >
          </ObcAlertButton>
        </template>
      </TopBar>
    </header>
    <main :class="{ 'hide-top-bar': !showTopBar }">
      <div class="content">
        <router-view></router-view>
        <div v-show="showBackdrop" class="backdrop" @click.stop="hideAll"></div>
        <!-- Use v-show so that company logo is loaded agressively -->
        <NavigationMenu
          v-show="!inactive"
          :variant="
            showNavigation ? ObcNavigationMenuVariant.Full : ObcNavigationMenuVariant.Compact
          "
          v-if="!configStore.hasConfig"
          class="navigation-menu"
        >
          <template #main>
            <DemoRouterLink label="Conning" :to="{ name: 'instrument-demo' }" @click="hideAll()">
              <obi-conning-iec slot="icon"></obi-conning-iec>
            </DemoRouterLink>
            <DemoRouterLink
              label="Azimuth"
              :to="{ name: 'responsive-instrument-demo' }"
              @click="hideAll()"
            >
              <obi-propulsion-azimuth-thruster slot="icon"></obi-propulsion-azimuth-thruster>
            </DemoRouterLink>
            <DemoRouterLink label="Icons" :to="{ name: 'icon-list' }" @click="hideAll()">
              <obi-placeholder slot="icon"></obi-placeholder>
            </DemoRouterLink>
            <DemoRouterLink label="IAS" :to="{ name: 'ias' }" @click="hideAll()">
              <obi-ias slot="icon"></obi-ias>
            </DemoRouterLink>
            <DemoRouterLink label="Graph" :to="{ name: 'graph' }" @click="hideAll()">
              <obi-diagnostic-google slot="icon"></obi-diagnostic-google>
            </DemoRouterLink>
            <obc-navigation-item-group label="Dummy">
              <obi-placeholder slot="icon"></obi-placeholder>
              <ObcNavigationItem label="Dummy 1" @click="hideAll()">
                <obi-placeholder slot="icon"></obi-placeholder>
              </ObcNavigationItem>
              <ObcNavigationItem label="Dummy 2" @click="hideAll()">
                <obi-placeholder slot="icon"></obi-placeholder>
              </ObcNavigationItem>
            </obc-navigation-item-group>
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
          v-if="showBrilliance"
          :palette="palette"
          :brightness="bridgeStore.brightness"
          show-auto-brightness
          class="brilliance"
          @palette-changed="onPaletteChange"
          @brightness-changed="onBrightnessChange"
        >
        </BrillianceMenu>
        <AppMenu
          v-if="showAppMenu"
          ref="appMenu"
          class="app-menu"
          @search="(e) => (appSearch = e.detail)"
        >
          <obc-app-button
            v-for="(a, i) in filteredApps"
            :key="i"
            :icon="a.appIcon"
            :label="a.name"
            :checked="a.name === configStore.app.name"
            @click="() => onAppSelected(a)"
            v-html="icon2element(a.appIcon, { slot: 'icon' })"
          >
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
  min-height: 100%;
  width: 100%;
  background-color: var(--container-backdrop-color);
}

main {
  box-sizing: border-box;
  padding-top: var(--app-components-topbar-touch-target-size);
  --obc-navigation-item-flyout-top: var(--app-components-topbar-touch-target-size);
  min-height: 100vh;

  &.hide-top-bar {
    padding-top: 0;
  }
}

header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
}

.content {
  isolation: isolate;
  padding-left: var(--menu-navigation-components-navigation-item-touch-target-size-large);
  min-height: 100%;

  .backdrop {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
}

.navigation-menu {
  position: fixed;
  top: var(--app-components-topbar-touch-target-size);
  left: 0;
  bottom: 0;
}

.topbar::part(dimming-button) {
  anchor-name: --dimming-menu-button;
}

.brilliance {
  position-anchor: --dimming-menu-button;
  position: fixed;
  top: calc(anchor(bottom) + 4px);
  right: calc(anchor(right) + 8px);
}

.topbar::part(apps-button) {
  anchor-name: --apps-menu-button;
}

.app-menu {
  position: fixed;
  position-anchor: --apps-menu-button;
  top: calc(anchor(bottom) + 4px);
  right: calc(anchor(right) + 8px);
  max-width: calc(100% - 8px);
}

.alert-button {
  anchor-name: --alert-button;
}

.alert-menu {
  position: fixed;
  position-anchor: --alert-button;
  top: calc(anchor(bottom) + 4px);
  right: anchor(right);
  width: 500px;
  max-width: calc(100% - 8px);
}

.topbar::part(left-more-button) {
  anchor-name: --more-menu-button;
}

.more-menu {
  position: fixed;
  position-anchor: --more-menu-button;
  top: calc(anchor(bottom) + 4px);
  right: calc(anchor(right) + 8px);
  display: none;
}

@media screen and (max-width: 500px) {
  .more-menu {
    display: revert;
  }

  .brilliance {
    top: calc(anchor(bottom) + 4px);
    right: calc(anchor(right) + 8px);
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

@media screen and (max-width: 1150px) {
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
    right: 4px;
    left: 4px;
  }
}
</style>
