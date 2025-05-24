<script setup lang="ts">
import { computed, ref } from 'vue'
import AppMenu from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/app-menu/ObcAppMenu.vue'
import { useConfigStore, type DummyApp } from '../stores/config'
import { type App } from '../business/model'
import { icon2element } from '../business/icon2element'

interface Props {
  showAppMenu: boolean
}

interface Emits {
  (e: 'hideAll'): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const configStore = useConfigStore()
const appSearch = ref('')

const onAppSelected = (selectedApp: App | DummyApp) => {
  configStore.selectApp(selectedApp)
  emit('hideAll')
  appSearch.value = ''
}

const filteredApps = computed(() => {
  return configStore.apps.filter((app) =>
    app.name.toLowerCase().includes(appSearch.value.toLowerCase())
  )
})
</script>

<template>
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
</template>

<style scoped>
.app-menu {
  position: fixed;
  position-anchor: --apps-menu-button;
  top: calc(anchor(bottom) + 4px);
  right: calc(anchor(right) + 8px);
  max-width: calc(100% - 16px);
}
</style> 