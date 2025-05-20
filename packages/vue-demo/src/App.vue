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
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-radar-overlay-proposal'

import BrillianceMenu from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/brilliance-menu/ObcBrillianceMenu.vue'
import AppMenu from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/app-menu/ObcAppMenu.vue'
import ObcAlertButton from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/alert-button/ObcAlertButton.vue'
import ObcContextMenu from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/context-menu/ObcContextMenu.vue'
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
import { NavigationMenuVariant, useDemoConfigStore } from './stores/demoConfig'
import { ObcNotificationMessageAction } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/notification-message/notification-message'
import { ObcAlertButtonType } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/alert-button/alert-button'
import { ObcAlertMenuItemStatus } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/alert-menu-item/alert-menu-item'
import AlertIcon from './components/AlertIcon.vue'
import  '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-speed-high'

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

const { inactive } = useInactivityHandling(120_000)
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
  () => inactive.value,
  (newInactive) => {
    if (newInactive) {
      hideAll()
    }
  }
)

const navigationMenuVariant = computed(() => {
  const variant = configStore.hasConfig
    ? ObcNavigationMenuVariant.Full
    : demoConfigStore.navigationMenuVariant
  if (showNavigation.value || variant === NavigationMenuVariant.Normal) {
    return ObcNavigationMenuVariant.Full
  } else if (variant === NavigationMenuVariant.Compact) {
    return ObcNavigationMenuVariant.Compact
  } else if (variant === NavigationMenuVariant.RailIconLarge) {
    return ObcNavigationMenuVariant.IconOnlyLarge
  } else if (variant === NavigationMenuVariant.RailIcon) {
    return ObcNavigationMenuVariant.IconOnly
  } else {
    return ObcNavigationMenuVariant.Full
  }
})

const showNavigationMenu = computed(() => {
  if (inactive.value) {
    return false
  }
  if (navigationMenuVariant.value === ObcNavigationMenuVariant.Full) {
    return showNavigation.value
  }
  return true
})

const showNavigationItemGroup = computed(() => {
  const variant = configStore.hasConfig
    ? NavigationMenuVariant.Normal
    : demoConfigStore.navigationMenuVariant
  return variant !== NavigationMenuVariant.RailIcon
})

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
  return alertStore.unackedAlerts.length === 0 && inactive.value
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
            class="notification-message"
            :action="
              visibleAlert?.alertStatus === ObcAlertMenuItemStatus.Unacknowledged
                ? ObcNotificationMessageAction.TextButton
                : ObcNotificationMessageAction.IconNoClick
            "
            :empty="visibleAlert === null"
            @action-click="onAckAlert"
            @message-click="toggleAlertMenu"
          >
            <template v-if="visibleAlert">
              <span slot="primary-icon">
                <AlertIcon
                  :alert-status="visibleAlert.alertStatus"
                  :alert-type="visibleAlert.alertType"
                />
              </span>
              <obi-speed-high slot="secondary-icon"></obi-speed-high>
              <div slot="title">{{ visibleAlert.title }}</div>
              <div slot="description">{{ visibleAlert.description }}</div>
              <div slot="time">{{ visibleAlert.time.toLocaleTimeString('en-GB') }}</div>
              <div slot="action-text">ACK</div>
              <div slot="action-icon">
                <obi-alarm-noack-iec usecsscolor></obi-alarm-noack-iec>
              </div>
            </template>
            <template #empty>No active messages</template>
          </ObcNotificationMessage>
          <ObcAlertButton
            slot="alerts"
            class="alert-button"
            :alert-type="visibleAlertType"
            :type="forceSmallAlert ? ObcAlertButtonType.Flat : ObcAlertButtonType.Normal"
            :n-alerts="alertStore.activeAlerts.length"
            counter
            show-silence-button
            :blinking="!showAlertMenu"
            :silence-button-disabled="silenced"
            @click-alert="toggleAlertMenu"
            @click-silence="onMuteAlert"
          >
          </ObcAlertButton>
        </template>
      </TopBar>
    </header>
    <main
      :class="{
        'hide-top-bar': !showTopBar,
        ['nav-type-' + demoConfigStore.navigationMenuVariant]: true
      }"
    >
      <div class="content">
        <router-view></router-view>
        <div v-show="showBackdrop" class="backdrop" @click.stop="hideAll"></div>
        <!-- Use v-show so that company logo is loaded agressively -->
        <NavigationMenu
          v-show="!inactive"
          v-if="!configStore.hasConfig && showNavigationMenu"
          :variant="navigationMenuVariant"
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
            <DemoRouterLink label="AR" :to="{ name: 'ar' }" @click="hideAll()">
              <obi-radar-overlay-proposal slot="icon"></obi-radar-overlay-proposal>
            </DemoRouterLink>
            <obc-navigation-item-group v-if="showNavigationItemGroup" label="Dummy">
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
              v-if="navigationMenuVariant === ObcNavigationMenuVariant.Full"
              :image-src="configStore.companyLogo"
              alt="Link to Open Industries Concept Lab"
              @click="openVendorLink"
            />
            <obc-navigation-item v-else label="OICL" @click="openVendorLink">
              <img
                slot="icon"
                :src="configStore.companyLogoSmall"
                alt="Link to Open Industries Concept Lab"
              />
            </obc-navigation-item>
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
  min-height: 100%;

  .backdrop {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
}

.nav-type-compact .content {
  padding-left: var(--menu-navigation-components-navigation-item-touch-target-size-large);
}

.nav-type-rail-icon-large .content {
  padding-left: calc(
    var(--app-components-navigation-menu-footer-margin-horizontal) * 2 +
      var(--menu-navigation-components-navigation-item-touch-target-size)
  );
}

.nav-type-rail-icon .content {
  padding-left: var(--menu-navigation-components-navigation-item-touch-target-size);
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
  max-width: calc(100% - 16px);
}

.alert-button {
  anchor-name: --alert-button;
}

.notification-message {
  anchor-name: --notification-message;
}

.alert-menu {
  position: fixed;
  position-anchor: --notification-message;
  top: calc(anchor(bottom) + 4px);
  right: calc(anchor(right));
  left: calc(anchor(left));
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
  .notification-message {
    display: none;
  }

  @position-try --alert-menu-stick-to-right {
    left: unset;
    right: 4px;
  }

  @position-try --alert-menu-full-width {
    left: 4px;
    right: 4px;
  }

  .alert-menu {
    position-anchor: --alert-button;
    right: calc(anchor(right) + 4px);
    left: unset;
    max-width: calc(100% - 8px);
    position-try-fallbacks: --alert-menu-stick-to-right, --alert-menu-full-width;
  }
}

.force-small.alert-large {
  display: none;
}

.force-small.alert-small {
  display: revert;
}
</style>
