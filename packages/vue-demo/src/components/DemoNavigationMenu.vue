<script setup lang="ts">
import { computed, onMounted } from 'vue'
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

import { useCompanyLogo } from '../composables/companyLogo'
import { useRoute } from 'vue-router'
import type { App } from '@/router'

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

const route = useRoute()

const configStore = useCompanyLogo()

const app = computed(() => {
  return route.meta.app as App | undefined
})

function hideAll() {
  emit('hideAll')
}

function openVendorLink() {
  window.open('https://www.oicl.no/', '_blank')
}
</script>

<template>
  <NavigationMenu v-show="!props.inactive" v-if="props.showNavigationMenu" :variant="props.navigationMenuVariant"
    class="navigation-menu">
    <template v-if="app" #main>
      <DemoRouterLink v-for="page in app.pages" :key="page.name" :label="page.title" :to="{ name: page.name }"
        @click="hideAll()">
        <obi-icon slot="icon" :icon="page.icon"></obi-icon>
      </DemoRouterLink>
    </template>

    <template #footer>
      <DemoRouterLink label="Help" :to="{ name: app?.name + '-help' }" @click="hideAll()">
        <obi-support-google slot="icon"></obi-support-google>
      </DemoRouterLink>
      <DemoRouterLink label="Settings" :to="{ name: app?.name + '-settings' }" @click="hideAll()">
        <obi-settings-iec slot="icon"></obi-settings-iec>
      </DemoRouterLink>
      <DemoRouterLink label="Alert" :to="{ name: app?.name + '-alert' }" @click="hideAll()">
        <obi-alerts slot="icon"></obi-alerts>
      </DemoRouterLink>
    </template>

    <template #logo>
      <ObcVendorButton v-if="props.navigationMenuVariant === ObcNavigationMenuVariant.Full"
        :image-src="configStore.companyLogo.value" alt="Link to Open Industries Concept Lab" @click="openVendorLink" />
      <obc-navigation-item v-else label="OICL" @click="openVendorLink">
        <img slot="icon" :src="configStore.companyLogoSmall.value" alt="Link to Open Industries Concept Lab" />
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
  isolation: isolate;
  z-index: 1000;
}
</style>