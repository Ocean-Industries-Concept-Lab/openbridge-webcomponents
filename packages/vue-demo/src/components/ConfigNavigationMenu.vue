<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<script setup lang="ts">
import type { Page } from '@/business/model';
import { useConfigStore } from '@/stores/config';
import NavigationMenu from '@oicl/openbridge-webcomponents-vue/components/navigation-menu/ObcNavigationMenu'
import '@oicl/openbridge-webcomponents/dist/components/navigation-item/navigation-item.js'

const configStore = useConfigStore()
const emits = defineEmits(['closeOthers'])

const onPageClick = (page: Page) => {
	emits("closeOthers")
  configStore.selectPage(page)
}
</script>

<template>
	<NavigationMenu >
	        <obc-navigation-item
	          v-for="page in configStore.pages"
	          :key="page.name + page.url"
	          slot="main"
	          :checked="configStore.page === page"
	          :icon="page.icon"
	          :label="page.name"
	          @click="onPageClick(page)"
	          v-html="icon2element(page.icon, 'icon')"
	        >
	        </obc-navigation-item>
	
	        <template #footer>
	          <obc-navigation-item label="Help" @click="onPageClick(configStore.app!.helpPage)">
	            <obi-03-support slot="icon"></obi-03-support>
	          </obc-navigation-item>
	          <obc-navigation-item label="Settings" @click="onPageClick(configStore.app!.configurationPage)">
	            <obi-03-settings slot="icon"></obi-03-settings>
	          </obc-navigation-item>
	          <DemoRouterLink label="Alert" :to="{ name: 'alert' }" @click="emits('closeOthers')">
				<obi-14-alerts slot="icon"></obi-14-alerts>
			</DemoRouterLink>
	        </template>
	
	        <img name="logo" :src="companyLogo" alt="logo" slot="logo" />
	      </NavigationMenu>
</template>
