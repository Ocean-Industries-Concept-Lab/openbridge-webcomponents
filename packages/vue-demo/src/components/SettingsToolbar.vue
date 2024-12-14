<template>
  <div class="container">
    <div class="group">
      <ObcIconButton variant="flat" corner-left>
        <obi-arrow-back-google></obi-arrow-back-google>
      </ObcIconButton>
      <ObcIconButton variant="flat" corner-right>
        <obi-arrow-forward-google></obi-arrow-forward-google>
      </ObcIconButton>
      <div class="divider"></div>
      <ObcButton variant="flat" hug-text>
        <template #leading-icon>
          <obi-support v-if="props.help"></obi-support>
          <obi-settings-iec v-else></obi-settings-iec>
        </template>
        Home
      </ObcButton>
    </div>
    <div class="group">
      <ObcIconButton variant="flat" @click="goToPreviousPage">
        <obi-close-google></obi-close-google>
      </ObcIconButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import ObcButton from '@oicl/openbridge-webcomponents-vue/components/button/ObcButton.vue'
import ObcIconButton from '@oicl/openbridge-webcomponents-vue/components/icon-button/ObcIconButton.vue'
import '@oicl/openbridge-webcomponents/dist/icons/icon-close-google'
import '@oicl/openbridge-webcomponents/dist/icons/icon-arrow-back-google'
import '@oicl/openbridge-webcomponents/dist/icons/icon-arrow-forward-google'
import '@oicl/openbridge-webcomponents/dist/icons/icon-settings-iec'
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
