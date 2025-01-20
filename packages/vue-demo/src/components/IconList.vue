<template>
  <div class="container">
    <div class="input-form card">
      <ObcInput v-model="search" placeholder="Search for icons" class="icon-filter" @input="onInput">
        <obi-search slot="icon"></obi-search>
      </ObcInput>
      <ObcButton>
        Download all
        <obi-file-download-google slot="leading-icon" />
      </ObcButton>
    </div>
    <div class="content-container">
      <div class="main-catergory" v-for="(group, groupKey) in icons" :key="groupKey">
        <div class="font-ui-title color-element-neutral title">{{ groupKey }}</div>
        <div v-for="(subgroup, subgroupKey) in group" :key="subgroupKey" class="sub-category">
          <div class="font-ui-subtitle color-element-neutral subtitle">{{ subgroupKey }}</div>
          <div class="icon-list">
            <div v-for="icon in subgroup" :key="icon.name" class="icon-item font-ui-label">
              <span class="color-element-active" v-html="icon.icon"></span>
              <span class="color-element-neutral">{{ icon.name }}</span>
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

const search = ref('')

function onInput(v: CustomEvent) {
  search.value = (v.target as HTMLInputElement).value
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

.container {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 12px;
  padding-top: 48px;
  max-width: 1024px;
  background-color: var(--container-bacground-color);
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
  padding-bottom: 8px;
}
</style>
