<template>
  <div class="screen-item">
    <button
      class="screen"
      :style="{ 'anchor-name': `--screen-anchor-${screen.name}` } as any"
      @click="showContextMenu = !showContextMenu"
    >
      <ObiIcon :icon="screen.page.icon" class="screen-icon" />
      <div class="screen-item-text font-ui-button">{{ screen.page.name }}</div>
    </button>
    <div class="screen-name font-ui-label">Screen {{ screen.name }}</div>
    <ObcContextMenuInput
      v-if="showContextMenu"
      :type="ContextMenuType.Flyout"
      class="screen-context-menu"
      :style="{ 'position-anchor': `--screen-anchor-${screen.name}` } as any"
      :options="contextMenuOptions"
      :selected-values="selectedMenuValues"
      @change="onContextMenuChange"
    />
  </div>
</template>

<script setup lang="ts">
import { html } from 'lit'
import ObiIcon from '@oicl/openbridge-webcomponents-vue/icons/ObiIcon.vue'
import ObcContextMenuInput from '@oicl/openbridge-webcomponents-vue/components/context-menu-input/ObcContextMenuInput.vue'
import { computed, ref } from 'vue'
import { useBridgeStore, type Screen, type ScreenPage } from '@/stores/bridge'
import { screenPages } from '@/router'
import '@oicl/openbridge-webcomponents/dist/icons/icon.js'
import {
  ContextMenuType,
  type ContextMenuOption,
  type ObcContextMenuInputChangeEvent
} from '@oicl/openbridge-webcomponents/dist/components/context-menu-input/context-menu-input'

const showContextMenu = ref(false)

const bridgeStore = useBridgeStore()

const props = defineProps<{
  screen: Screen
}>()

const contextMenuOptions = computed((): ContextMenuOption[] => {
  return screenPages.map((app) => {
    if (app.pages.length > 1) {
      return {
        value: `app-group-${app.app}`,
        label: app.app,
        children: app.pages.map((page) => ({
          value: page.path,
          label: page.name,
          icon: html`<obi-icon .icon=${page.icon}></obi-icon>`
        }))
      }
    }
    const page = app.pages[0]!
    return {
      value: page.path,
      label: page.name,
      icon: html`<obi-icon .icon=${page.icon}></obi-icon>`
    }
  })
})

const selectedMenuValues = computed(() => [props.screen.page.path])

function findPageByPath(path: string): ScreenPage | null {
  for (const app of screenPages) {
    for (const page of app.pages) {
      if (page.path === path) {
        return { name: page.name, icon: page.icon, path: page.path }
      }
    }
  }
  return null
}

const onContextMenuChange = (event: ObcContextMenuInputChangeEvent) => {
  if (!event.detail.selectedValues.length) return
  const path = event.detail.selectedValues[0]
  const page = findPageByPath(path)
  if (page) {
    bridgeStore.updateScreen({ ...props.screen, page })
    showContextMenu.value = false
  }
}
</script>

<style scoped>
.screen-item {
  display: flex;
  flex-direction: column;
}

.screen {
  appearance: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  border: 1px solid var(--normal-enabled-border-color);
  background: var(--normal-enabled-background-color);
  width: 240px;
  height: 144px;
  margin: 0;
  color: var(--element-neutral-color);
  anchor-name: --screen-anchor;
  cursor: pointer;

  &:hover {
    background: var(--normal-hover-background-color);
    border-color: var(--normal-hover-border-color);
  }

  &:active {
    background: var(--normal-pressed-background-color);
    border-color: var(--normal-pressed-border-color);
  }
}

.middle-screens .screen {
  width: 480px;
  height: 288px;
}

.screen-icon {
  width: 64px;
  height: 64px;
}

.screen-name {
  color: var(--element-active-color);
  text-align: center;
}

.screen-context-menu {
  position: absolute;
  top: calc(anchor(bottom) + 4px);
  right: anchor(right);
}
</style>
