<template>
  <div class="container">
    <div class="group">
      <ObcIconButton variant="flat" corner-left>
        <obi-02-arrow-back></obi-02-arrow-back>
      </ObcIconButton>
      <ObcIconButton variant="flat" corner-right>
        <obi-02-arrow-forward></obi-02-arrow-forward>
      </ObcIconButton>
      <div class="divider"></div>
      <ObcButton variant="flat" hug-text>
        <template #leading-icon>
          <obi-03-support v-if="props.help"></obi-03-support>
          <obi-03-settings v-else></obi-03-settings>
        </template>
        Home
      </ObcButton>
    </div>
    <div class="group">
      <ObcIconButton variant="flat" @click="goToPreviousPage">
        <obi-01-close></obi-01-close>
      </ObcIconButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import ObcButton from '@oicl/openbridge-webcomponents-vue/components/button/ObcButton.vue'
import ObcIconButton from '@oicl/openbridge-webcomponents-vue/components/icon-button/ObcIconButton.vue'
import '@oicl/openbridge-webcomponents/dist/icons/icon-01-close'
import '@oicl/openbridge-webcomponents/dist/icons/icon-02-arrow-back'
import '@oicl/openbridge-webcomponents/dist/icons/icon-02-arrow-forward'
import '@oicl/openbridge-webcomponents/dist/icons/icon-03-settings'
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
