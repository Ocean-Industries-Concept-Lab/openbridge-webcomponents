<template>
  <div class="container">
    <div class="input-form card">
      <ObcInput v-model="search" placeholder="Search for icons" class="icon-filter" @input="onInput">
        <obi-search slot="icon"></obi-search>
      </ObcInput>
      <ObcButton>
        Filter
        <obi-filter slot="leading-icon" />
        <obi-drop-down-google slot="trailing-icon" />
      </ObcButton>
      <ObcButton>
        Download all
        <obi-file-download-google slot="leading-icon" />
      </ObcButton>
      <ObcToggleButtonGroup :value="bridgeStore.palette" @value="onPaletteChange" class="palette-toggle">
        <ObcToggleButtonOption value="night">
          <obi-palette-night slot="icon"></obi-palette-night>
        </ObcToggleButtonOption>
        <ObcToggleButtonOption value="dusk">
          <obi-palette-dusk slot="icon"></obi-palette-dusk>
        </ObcToggleButtonOption>
        <ObcToggleButtonOption value="day">
          <obi-palette-day slot="icon"></obi-palette-day>
        </ObcToggleButtonOption>
        <ObcToggleButtonOption value="bright">
          <obi-palette-day-bright slot="icon"></obi-palette-day-bright>
        </ObcToggleButtonOption>
      </ObcToggleButtonGroup>
    </div>
    <div class="content-container">
      <div class="main-catergory" v-for="(group, groupKey) in icons" :key="groupKey">
        <div class="font-ui-title color-element-neutral title">{{ groupKey }}</div>
        <div v-for="(subgroup, subgroupKey) in group" :key="subgroupKey" class="sub-category">
          <div class="font-ui-subtitle color-element-neutral subtitle">{{ subgroupKey }}</div>
          <div class="icon-list">
            <div v-for="icon in subgroup" :key="icon.name" class="icon-item font-ui-label">
              <ObcIconButton class="color-element-active icon" variant="flat" size="large">
                <span v-html="icon.icon"></span>
              </ObcIconButton>
              <span class="color-element-neutral icon-description">{{ icon.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { iconIds } from '@oicl/openbridge-webcomponents/src/icons/names'
import { icon2element } from '@/business/icon2element'
import ObcInput from '@oicl/openbridge-webcomponents-vue/components/input/ObcInput.vue'
import { watch } from 'vue'
import ObcButton from '@oicl/openbridge-webcomponents-vue/components/button/ObcButton.vue'
import ObcIconButton from '@oicl/openbridge-webcomponents-vue/components/icon-button/ObcIconButton.vue'
import { useBridgeStore } from '@/stores/bridge'
import ObcToggleButtonGroup from '@oicl/openbridge-webcomponents-vue/components/toggle-button-group/ObcToggleButtonGroup.vue'
import ObcToggleButtonOption from '@oicl/openbridge-webcomponents-vue/components/toggle-button-option/ObcToggleButtonOption.vue'

const search = ref('')
const bridgeStore = useBridgeStore()

function onInput(v: CustomEvent) {
  search.value = (v.target as HTMLInputElement).value
}

function onPaletteChange(v: CustomEvent) {
  bridgeStore.setPalette(v.detail.value)
}

interface Icon {
  name: string
  icon: string
}

const icons = ref<Record<string, Record<string, Icon[]>>>({})

function updateIconList() {
  const filteredIcons: Icon[] = Object.keys(iconIds)
    .filter((iconId) => {
      return iconId.toLowerCase().includes(search.value.toLowerCase())
    })
    .map((icon) => {
      return { name: icon, icon: icon2element(icon, { useCssColor: true }) }
    })
  // icon mapped in groups and subgroups
  const grouped: Record<string, Record<string, Icon[]>> = {}
  for (const iconId of filteredIcons) {
    const categories = iconIds[iconId.name]
    if (!categories) {
      continue
    }
    const [group, subgroup] = categories;
    if (!grouped[group]) {
      grouped[group] = {}
    }
    if (!grouped[group][subgroup]) {
      grouped[group][subgroup] = []
    }
    grouped[group][subgroup].push(iconId)
  }
  icons.value = grouped
}

watch([search], updateIconList, { immediate: true })
</script>

<style scoped>
.content-container {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.main-catergory {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.icon-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 24px;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
}

.icon::part(icon) {
  width: 36px;
  height: 36px;
}

.container {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 12px;
  padding-top: 48px;
  max-width: 1024px;
  margin: 0 auto;
}

.input-form {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.title {
  margin-bottom: -48px;
}

.subtitle {
  padding-bottom: 24px;
}

.icon-description {
  color: var(--element-neutral-color, rgba(0, 0, 0, 0.59));
  text-align: center;
  font-feature-settings: 'ss02' on, 'liga' off, 'clig' off;
  font-family: "Noto Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 370;
  line-height: 24px;
  /* 150% */
}

.palette-toggle {
  min-width: 248px
}
</style>
