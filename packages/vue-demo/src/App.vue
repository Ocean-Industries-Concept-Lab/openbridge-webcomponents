<script setup lang="ts">
import { onMounted, computed, ref, watch } from 'vue'

import TopBar from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/top-bar/ObcTopBar.vue'
import DemoNavigationMenu from './components/DemoNavigationMenu.vue'
import { ObcNavigationMenuVariant } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/navigation-menu/navigation-menu'
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-palette-dimming'
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-applications'
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-speed-high'

import BrillianceMenu from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/brilliance-menu/ObcBrillianceMenu.vue'
import ObcContextMenu from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/context-menu/ObcContextMenu.vue'
import ObcCommandButton from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/command-button/ObcCommandButton.vue'
import AlertNotification from './components/AlertNotification.vue'
import DemoAppMenu from './components/DemoAppMenu.vue'
import DemoCommandMenu from './components/DemoCommandMenu.vue'

import { useAlertHandling } from './alert-handling'
import { useAlertStore } from './stores/alert'
import DemoAlertMenu from './components/DemoAlertMenu.vue'
import { useBridgeStore } from './stores/bridge'
import { useWindowHandling } from './window-handling'
import { useClockHandling } from './clock-handling'
import { simulatedAlerts, startAlerts } from './business/default-alarms'
import { useInactivityHandling } from './inactivity-handling'
import { useRoute } from 'vue-router'
import { NavigationMenuVariant, useDemoConfigStore } from './stores/demoConfig'
import { useSpeedAlerts } from './composables/useSpeedAlerts'
import { useComponentSize } from './composables/useComponentSize'
import type { App } from './router'
import ObcIconButton from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/icon-button/ObcIconButton.vue'
import { IconButtonVariant } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/icon-button/icon-button.js'
import { useHotkeys } from './composables/useHotkeys'
import router from './router'

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
  toggleMoreMenu,
  toggleCommandMenu,
  showCommandMenu
} = useWindowHandling()
const route = useRoute()

const app = computed(() => {
  return route.meta.app as App | undefined
})
const zoom = computed(() => {
  return app.value?.zoom
})
const smallScreen = computed(() => {
  return app.value?.smallScreen ?? false
})
useComponentSize({ zoom })
useSpeedAlerts(10, smallScreen)

const inactivityDeadline = computed(() => {
  return smallScreen.value ? 10_000 : 120_000
})

const { inactive } = useInactivityHandling(
  inactivityDeadline,
  computed(() => smallScreen.value)
)
const { visibleAlert, visibleAlertType, silenced, onMuteAlert, onAckAlert } = useAlertHandling()
const { date } = useClockHandling()

const alertStore = useAlertStore()
const bridgeStore = useBridgeStore()
const demoConfigStore = useDemoConfigStore()
const showTopBar = ref(true)

watch(
  () => inactive.value,
  (newInactive) => {
    if (newInactive) {
      hideAll()
    }
  }
)

const navigationMenuVariant = computed(() => {
  const variant = demoConfigStore.navigationMenuVariant
  if (smallScreen.value) {
    return ObcNavigationMenuVariant.Full
  } else if (showNavigation.value || variant === NavigationMenuVariant.Normal) {
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

onMounted(() => {
  // get all url params
  const urlParams = new URLSearchParams(window.location.search)
  const randomId = Math.random().toString(36).substring(7)
  const bridgeId = urlParams.get('bridgeId') ?? randomId
  const screenName = urlParams.get('screenName') ?? ''
  bridgeStore.setBridgeId(bridgeId, screenName)

  showTopBar.value = !urlParams.has('hidetopbar')
  alertStore.setAlerts({ startAlerts, simulatedAlerts })

  useHotkeys()

  import('@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/index.js')
})

const palette = computed(() => bridgeStore.palette)

function onPaletteChange(event: CustomEvent) {
  bridgeStore.setPalette(event.detail.value)
}

function onBrightnessChange(event: CustomEvent) {
  bridgeStore.setBrightness(event.detail.value)
}

const pageTitle = computed(() => {
  return (route.meta.title as string | undefined) ?? 'OpenBridge'
})

const settingsTopBar = computed((): boolean => {
  return (route.meta.settingsTopBar ?? false) && (app.value?.smallScreen ?? false)
})

watch(route, () => {
  const background = (route.meta.background as string | undefined) ?? '--container-backdrop-color'
  document.querySelector('body')?.style.setProperty('background-color', `var(${background})`)
})

const onCommandChange = (event: CustomEvent) => {
  demoConfigStore.hasCommand = event.detail.inCommand
}

const goToPreviousPage = () => {
  router.go(-1)
}
</script>

<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
  <header v-if="app?.noTopBar">
    <ObcIconButton
      :variant="IconButtonVariant.flat"
      :activated="showAppMenu"
      class="app-menu-button"
      @click="toggleAppMenu"
    >
      <obi-applications></obi-applications>
    </ObcIconButton>
  </header>
  <header v-else-if="showTopBar">
    <TopBar
      class="topbar"
      app-title="OpenBridge"
      :page-name="pageTitle"
      :date="date"
      show-apps-button
      show-dimming-button
      show-clock
      :inactive="inactive"
      :app-button-breakpoint-px="500"
      :dimming-button-breakpoint-px="500"
      :app-title-breakpoint-px="smallScreen ? 100000 : 400"
      :clock-minimize-breakpoint-px="inactive && smallScreen ? 100000 : 300"
      :menu-button-activated="showNavigation"
      :dimming-button-activated="showBrilliance"
      :apps-button-activated="showAppMenu"
      :left-more-button-activated="showMoreMenu"
      @menu-button-clicked="toggleNavigation"
      @dimming-button-clicked="toggleBrilliance"
      @apps-button-clicked="toggleAppMenu"
      @left-more-button-clicked="toggleMoreMenu"
      :settings="settingsTopBar"
      @close="goToPreviousPage"
    >
      <template v-if="app?.showInCommandMenu" #command-button>
        <ObcCommandButton
          class="command-button"
          :in-command="demoConfigStore.hasCommand"
          @click="toggleCommandMenu"
        />
      </template>
      <template #alerts>
        <AlertNotification
          :visible-alert="visibleAlert"
          :visible-alert-type="visibleAlertType"
          :inactive="inactive"
          :show-alert-menu="showAlertMenu"
          :silenced="silenced"
          @ack-alert="onAckAlert"
          @toggle-alert-menu="toggleAlertMenu"
          @mute-alert="onMuteAlert"
        />
      </template>
    </TopBar>
  </header>
  <main
    :class="{
      'hide-top-bar': !showTopBar,
      'small-screen': smallScreen,
      ['nav-type-' + demoConfigStore.navigationMenuVariant]: true
    }"
  >
    <div class="content">
      <router-view></router-view>
      <div v-show="showBackdrop" class="backdrop" @click.stop="hideAll"></div>
      <!-- Use v-show so that company logo is loaded agressively -->
      <DemoNavigationMenu
        :inactive="inactive"
        :show-navigation-menu="showNavigationMenu"
        :navigation-menu-variant="navigationMenuVariant"
        :small-screen="smallScreen ?? false"
        @hide-all="hideAll"
      />
      <DemoCommandMenu v-if="showCommandMenu" @change="onCommandChange" />
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
      <DemoAppMenu :show-app-menu="showAppMenu" @hide-all="hideAll" />
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
</template>

<style scoped>
main {
  box-sizing: border-box;
  padding-top: var(--app-components-topbar-touch-target-size);
  --obc-navigation-item-flyout-top: var(--app-components-topbar-touch-target-size);
  min-height: 100%;
  height: 100%;

  &.hide-top-bar {
    padding-top: 0;
  }
}

main.small-screen {
  padding-top: 0;
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
  height: 100%;

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

.topbar::part(dimming-button) {
  anchor-name: --dimming-menu-button;
}

@position-try --small-screen-dimming-button {
  right: 4px;
}

.brilliance {
  position-anchor: --dimming-menu-button;
  position: fixed;
  top: calc(anchor(bottom) + 4px);
  right: calc(anchor(right) + 8px);
  position-try: --small-screen-dimming-button;
}

.topbar::part(apps-button) {
  anchor-name: --apps-menu-button;
}

.app-menu-button {
  anchor-name: --apps-menu-button;
  position: absolute;
  top: 4px;
  right: 4px;
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

.command-button {
  anchor-name: --command-button;
}
</style>
