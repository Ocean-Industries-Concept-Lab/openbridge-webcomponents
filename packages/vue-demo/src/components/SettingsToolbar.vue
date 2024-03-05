<template>
  <div class="container">
    <div class="group">
      <ObcIconButton variant="flat" cornerLeft>
        <obi-02-arrow-back></obi-02-arrow-back>
      </ObcIconButton>
      <ObcIconButton variant="flat" cornerRight>
        <obi-02-arrow-forward></obi-02-arrow-forward>
      </ObcIconButton>
      <div class="divider"></div>
      <ObcButton variant="flat" hug-text>
        <template #leading-icon>
          <obi-03-settings></obi-03-settings>
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
import ObcButton from '@oicl/openbridge-webcomponents-vue/components/button/ObcButton'
import ObcIconButton from '@oicl/openbridge-webcomponents-vue/components/icon-button/ObcIconButton'
import '@oicl/openbridge-webcomponents/dist/icons/icon-01-close'
import '@oicl/openbridge-webcomponents/dist/icons/icon-02-arrow-back'
import '@oicl/openbridge-webcomponents/dist/icons/icon-02-arrow-forward'
import '@oicl/openbridge-webcomponents/dist/icons/icon-03-settings'
import { useRouter } from 'vue-router'

const router = useRouter()

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
