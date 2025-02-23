<template>
  <div class="container">
    <div class="group">
      <ObcIconButton :variant="IconButtonVariant.flat" corner-left>
        <obi-arrow-left-google></obi-arrow-left-google>
      </ObcIconButton>
      <ObcIconButton :variant="IconButtonVariant.flat" corner-right>
        <obi-arrow-right-google></obi-arrow-right-google>
      </ObcIconButton>
      <div class="divider"></div>
      <ObcButton :variant="ButtonVariant.flat" hug-text>
        <template #leading-icon>
          <obi-support v-if="props.help"></obi-support>
          <obi-settings-iec v-else></obi-settings-iec>
        </template>
        Home
      </ObcButton>
    </div>
    <div class="group">
      <ObcIconButton :variant="IconButtonVariant.flat" @click="goToPreviousPage">
        <obi-close-google></obi-close-google>
      </ObcIconButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ButtonVariant } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/button/button.js'
import ObcButton from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/button/ObcButton.vue'
import { IconButtonVariant } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/icon-button/icon-button'
import ObcIconButton from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/icon-button/ObcIconButton.vue'
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-close-google'
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-arrow-left-google'
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-arrow-right-google'
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-settings-iec'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  help: Boolean
})

const goToPreviousPage = () => {
  router.go(-1)
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 72px;
}

.group {
  display: flex;
  align-items: center;
}

.divider {
  width: 1px;
  height: 16px;
  background-color: var(--border-divider-color);
}
</style>
