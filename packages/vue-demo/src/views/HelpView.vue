<script setup lang="ts">
import SettingsToolbar from '@/components/SettingsToolbar.vue'
import ObcElevatedCard from '@oicl/openbridge-webcomponents-vue/components/elevated-card/ObcElevatedCard.vue'
import { ObcElevatedCardSize } from '@oicl/openbridge-webcomponents/dist/components/elevated-card/elevated-card'
import '@oicl/openbridge-webcomponents/dist/icons/icon-chevron-right-google'
import '@oicl/openbridge-webcomponents/dist/icons/icon-placeholder'
</script>

<template>
  <SettingsToolbar help />
  <div class="wrapper">
    <ObcElevatedCard has-graphic info :size="ObcElevatedCardSize.MultiLine">
      <template #graphic>
        <div
          style="
            width: 100%;
            height: 120px;
            color: var(--element-active-inverted-color);
            background: var(--instrument-enhanced-secondary-color);
            padding-top: 40px;
            padding-bottom: 32px;
          "
        >
          <obi-support-google></obi-support-google>
        </div>
      </template>
      <template #label><div>Help and documentation</div></template>
      <template #description
        ><div>
          Description with multiple lines of text and more than one line of description
        </div></template
      >
    </ObcElevatedCard>
    <div class="group">
      <ObcElevatedCard has-leading-icon has-trailing-icon :size="ObcElevatedCardSize.DoubleLine">
        <template #leading-icon>
          <obi-placeholder></obi-placeholder>
        </template>
        <template #label>FAQ</template>
        <template #description><div>Description with a lot of text</div></template>
        <template #trailing-icon>
          <obi-chevron-right-google></obi-chevron-right-google>
        </template>
      </ObcElevatedCard>
      <ObcElevatedCard has-leading-icon has-trailing-icon :size="ObcElevatedCardSize.DoubleLine">
        <template #leading-icon>
          <obi-placeholder></obi-placeholder>
        </template>
        <template #label><div>Introduction</div></template>
        <template #description><div>Description with a lot of text</div></template>
        <template #trailing-icon>
          <obi-chevron-right-google></obi-chevron-right-google>
        </template>
      </ObcElevatedCard>
      <ObcElevatedCard has-leading-icon has-trailing-icon :size="ObcElevatedCardSize.DoubleLine">
        <template #leading-icon>
          <obi-placeholder></obi-placeholder>
        </template>
        <template #label><div>Course</div></template>
        <template #description>
          <div>Description with a lot of text</div>
        </template>
        <template #trailing-icon>
          <obi-chevron-right-google></obi-chevron-right-google>
        </template>
      </ObcElevatedCard>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 896px;
  margin: 0 auto;
  padding: 48px;
  padding-top: 8px;

  gap: 32px;
}

@media screen and (max-width: 768px) {
  .wrapper {
    padding: 8px;
  }
}

.logo {
  width: 100%;
  height: 174px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo * {
  width: 96px;
  height: 96px;
  color: var(--element-neutral-color);
}

.row {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.col {
  flex: 1;
  min-width: 220px;
}

.group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.divider {
  width: 100%;
  height: 1px;
  background-color: var(--border-divider-color);
}
</style>
