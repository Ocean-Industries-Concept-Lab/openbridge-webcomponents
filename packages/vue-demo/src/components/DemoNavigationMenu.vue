<script setup lang="ts">
import { computed } from 'vue'
import DemoRouterLink from './DemoRouterLink.vue'

import NavigationMenu from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/navigation-menu/ObcNavigationMenu.vue'
import ObcNavigationItemGroup from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/navigation-item-group/ObcNavigationItemGroup.vue'
import ObcNavigationItem from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/navigation-item/ObcNavigationItem.vue'
import { ObcNavigationMenuVariant } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/navigation-menu/navigation-menu'
import ObcVendorButton from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/vendor-button/ObcVendorButton.vue'

// Navigation-specific icon imports
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/navigation-item/navigation-item.js'
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-conning-iec'
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-propulsion-azimuth-thruster'
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-placeholder'
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ias'
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-diagnostic-google'
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-radar-overlay-proposal'
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-support-google'
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ecdis-proposal'

import { useConfigStore } from '../stores/config'
import { useDemoConfigStore, NavigationMenuVariant } from '../stores/demoConfig'

interface Props {
  inactive: boolean
  showNavigationMenu: boolean
  navigationMenuVariant: ObcNavigationMenuVariant
}

interface Emits {
  (e: 'hideAll'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const configStore = useConfigStore()
const demoConfigStore = useDemoConfigStore()

const showNavigationItemGroup = computed(() => {
  const variant = demoConfigStore.navigationMenuVariant
  return variant !== NavigationMenuVariant.RailIcon
})

function hideAll() {
  emit('hideAll')
}

function openVendorLink() {
  window.open('https://www.oicl.no/', '_blank')
}
</script>

<template>
  <NavigationMenu
    v-show="!props.inactive"
    v-if="props.showNavigationMenu"
    :variant="props.navigationMenuVariant"
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
      <DemoRouterLink label="ECDIS" :to="{ name: 'ecdis' }" @click="hideAll()">
        <obi-ecdis-proposal slot="icon"></obi-ecdis-proposal>
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
        v-if="props.navigationMenuVariant === ObcNavigationMenuVariant.Full"
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
</template>

<style scoped>
.navigation-menu {
  position: fixed;
  top: var(--app-components-topbar-touch-target-size);
  left: 0;
  bottom: 0;
}
</style> 