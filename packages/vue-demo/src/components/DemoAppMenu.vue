<script setup lang="ts">
import { computed, ref } from 'vue'
import AppMenu from '@oicl/openbridge-webcomponents-vue/components/app-menu/ObcAppMenu.vue'
import { icon2element } from '../business/icon2element'
import { apps, type App } from '@/router'
import { useRoute, useRouter } from 'vue-router'

interface Props {
  showAppMenu: boolean
}

interface Emits {
  (e: 'hideAll'): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const router = useRouter()
const appSearch = ref('')
const allApps = apps

const onAppSelected = (selectedApp: App) => {
  const firstPage = selectedApp.pages[0]
  if (!firstPage) {
    return
  }
  router.push({ name: firstPage.name })
  emit('hideAll')
  appSearch.value = ''
}

const filteredApps = computed(() => {
  return allApps.filter((app) => app.name.toLowerCase().includes(appSearch.value.toLowerCase()))
})

const route = useRoute()
const currentApp = computed(() => {
  return route.meta.app as App | undefined
})
</script>

<template>
  <AppMenu v-if="showAppMenu" ref="appMenu" class="app-menu" @search="(e) => (appSearch = e.detail)">
    <obc-app-button v-for="(a, i) in filteredApps" :key="i" :icon="a.appIcon" :label="a.name"
      :checked="a.name === currentApp?.name" @click="() => onAppSelected(a)"
      v-html="icon2element(a.appIcon, { slot: 'icon' })">
    </obc-app-button>
  </AppMenu>
</template>

<style scoped>
@position-try --small-screen-app-menu {
  position-anchor: --more-menu-button;
  right: 4px;
}

.app-menu {
  position: fixed;
  position-anchor: --apps-menu-button;
  top: calc(anchor(bottom) + 4px);
  right: calc(anchor(right) + 8px);
  max-width: calc(100% - 8px);
  position-try: --small-screen-app-menu;
}
</style>
