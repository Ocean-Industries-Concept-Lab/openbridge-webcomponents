<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<script setup lang="ts">
import type { Page } from '@/business/model'
import { useConfigStore } from '@/stores/config'
import NavigationMenu from '@oicl/openbridge-webcomponents-vue/components/navigation-menu/ObcNavigationMenu.vue'
import DemoRouterLink from './DemoRouterLink.vue'
import '@oicl/openbridge-webcomponents/dist/components/navigation-item/navigation-item.js'
import { icon2element } from '@/business/icon2element'

const configStore = useConfigStore()
const emits = defineEmits(['closeOthers'])

const onPageClick = (page: Page) => {
  emits('closeOthers')
  configStore.selectPage(page)
}
</script>

<template>
  <NavigationMenu>
    <obc-navigation-item
      v-for="page in configStore.pages"
      :key="page.name + page.url"
      slot="main"
      :checked="configStore.page === page"
      :icon="page.icon"
      :label="page.name"
      @click="onPageClick(page)"
      v-html="icon2element(page.icon, {slot: 'icon'})"
    >
    </obc-navigation-item>

    <template #footer>
      <obc-navigation-item
        label="Help"
        :checked="configStore.page?.name === configStore.helpPage?.name"
        @click="onPageClick(configStore.helpPage!)"
      >
        <obi-03-support slot="icon"></obi-03-support>
      </obc-navigation-item>
      <obc-navigation-item
        label="Settings"
        :checked="configStore.page?.name === configStore.configPage?.name"
        @click="onPageClick(configStore.configPage!)"
      >
        <obi-03-settings slot="icon"></obi-03-settings>
      </obc-navigation-item>
      <DemoRouterLink label="Alert" :to="{ name: 'alert' }" @click="emits('closeOthers')">
        <template #icon>
          <obi-14-alerts></obi-14-alerts>
        </template>
      </DemoRouterLink>
    </template>

    <template #logo>
      <img name="logo" :src="configStore.companyLogo" alt="logo" />
    </template>
  </NavigationMenu>
</template>
