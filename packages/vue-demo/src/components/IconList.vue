<template>
  <div class="container">
    <div class="input-form card">
      <ObcInput
        v-model="search"
        placeholder="Search icons..."
        class="icon-filter"
        @input="onInput"
      />
      <ObcToggleSwitch :checked="useCss" label="Use CSS colors" @input="useCss = !useCss" />
    </div>
    <div class="icon-list card">
      <div v-for="icon in filteredIcons" :key="icon.name" class="icon-item font-ui-label">
        <span class="color-element-active" v-html="icon.icon"></span>
        <span class="color-element-neutral">{{ icon.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { iconIds } from '@oicl/openbridge-webcomponents/src/icons/names'
import { icon2element } from '@/business/icon2element'
import ObcInput from '@oicl/openbridge-webcomponents-vue/components/input/ObcInput.vue'
import ObcToggleSwitch from '@oicl/openbridge-webcomponents-vue/components/toggle-switch/ObcToggleSwitch.vue'
import { watch } from 'vue'

const search = ref('')
const useCss = ref(true)

function onInput(v: CustomEvent) {
  search.value = (v.target as HTMLInputElement).value
}

const filteredIcons = ref<{ icon: string; name: string }[]>([])

function updateIconList() {
  filteredIcons.value = Object.keys(iconIds)
    .filter((iconId) => {
      return iconId.toLowerCase().includes(search.value.toLowerCase())
    })
    .map((icon) => {
      return { name: icon, icon: icon2element(icon, { useCssColor: useCss.value }) }
    })
}

watch([search, useCss], updateIconList, { immediate: true })
</script>

<style scoped>
.card {
  border-radius: 24px;
  padding: 24px;
  background-color: var(--container-background-color);
}

.icon-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 16px;
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
  padding: 16px;
  padding-top: 24px;
}

.input-form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 300px;
}
</style>
