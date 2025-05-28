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
import ObcCommandMenu from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/command-menu/ObcCommandMenu.vue'
import AlertNotification from './components/AlertNotification.vue'
import DemoAppMenu from './components/DemoAppMenu.vue'

import { useAlertHandling } from './alert-handling'
import { useAlertStore } from './stores/alert'
import DemoAlertMenu from './components/DemoAlertMenu.vue'
import { useBridgeStore } from './stores/bridge'
import { useWindowHandling } from './window-handling'
import { useClockHandling } from './clock-handling'
import { useConfigStore } from './stores/config'
import { simulatedAlerts, startAlerts } from './business/default-alarms'
import { useInactivityHandling } from './inactivity-handling'
import { useRoute } from 'vue-router'
import { NavigationMenuVariant, useDemoConfigStore } from './stores/demoConfig'
import { useSpeedAlerts } from './composables/useSpeedAlerts';
import { useComponentSize } from './composables/useComponentSize'
import type { App } from './router'

useSpeedAlerts(5);
useComponentSize();

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

const { inactive } = useInactivityHandling(120_000)
const { visibleAlert, visibleAlertType, silenced, onMuteAlert, onAckAlert } = useAlertHandling()
const { date } = useClockHandling()

const alertStore = useAlertStore()
const bridgeStore = useBridgeStore()
const configStore = useConfigStore()
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

onMounted(() => {
  // get all url params
  const urlParams = new URLSearchParams(window.location.search)
  const randomId = Math.random().toString(36).substring(7)
  const bridgeId = urlParams.get('bridgeId') ?? randomId
  bridgeStore.setBridgeId(bridgeId)
  
  showTopBar.value = !urlParams.has('hidetopbar')
  alertStore.setAlerts({ startAlerts, simulatedAlerts })

  import('@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/index.js')
})

const palette = computed(() => bridgeStore.palette)

function onPaletteChange(event: CustomEvent) {
  bridgeStore.setPalette(event.detail.value)
}

function onBrightnessChange(event: CustomEvent) {
  bridgeStore.setBrightness(event.detail.value)
}

const route = useRoute()

const app = computed(() => {
  return route.meta.app as App | undefined
})

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

const onCommandChange = (event: CustomEvent) => {
  demoConfigStore.hasCommand = event.detail.inCommand
}
</script>

<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
  <div class="root" :style="`background-color: var(${backgroundColor}) `">
    <header v-if="showTopBar">
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
        <template v-if="app?.showInCommandMenu" #command-button>
          <ObcCommandButton class="command-button" :in-command="demoConfigStore.hasCommand" @click="toggleCommandMenu"/>
        </template>
        <template #alerts >
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
          @hide-all="hideAll"
        />
        <ObcCommandMenu v-if="showCommandMenu" class="command-menu" :in-command="demoConfigStore.hasCommand" :has-location="!demoConfigStore.hasCommand" @change="onCommandChange">
          <div slot="command-icon">
            <obi-joystick v-if="demoConfigStore.hasCommand"></obi-joystick>
            <obi-command-no v-else></obi-command-no>
          </div>
          <div slot="command-status">
            {{ demoConfigStore.hasCommand ? 'Joystick' : 'NO CMD' }}
          </div>
          <div slot="command-description">
            {{ demoConfigStore.hasCommand ? 'Lillestrøm' : 'CMD at ROC' }}
          </div>
          <div slot="command-location">Ålesund</div>
          <div slot="toogle-action-to-in-command-label">Take</div>
          <div slot="toogle-action-to-no-command-label">Release</div>
          <div slot="toogle-state-in-command-label">In CMD</div>
          <div slot="toogle-state-no-command-label">ROC</div>
        </ObcCommandMenu>
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
        <DemoAppMenu
          :show-app-menu="showAppMenu"
          @hide-all="hideAll"
        />
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
  min-height: 100%;

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

.brilliance {
  position-anchor: --dimming-menu-button;
  position: fixed;
  top: calc(anchor(bottom) + 4px);
  right: calc(anchor(right) + 8px);
}

.topbar::part(apps-button) {
  anchor-name: --apps-menu-button;
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

.command-button {
  anchor-name: --command-button;
}

.command-menu {
  position: fixed;
  position-anchor: --command-button;
  top: calc(anchor(bottom) + 4px);
  left: calc(anchor(left) + 8px);
}

</style>
