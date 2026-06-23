<script setup lang="ts">
import QrCode from '@/components/QrCode.vue'
import OpenBridgeLogo from '@/components/OpenBridgeLogo.vue'
import ObiApplicationOpenGoogle from '@oicl/openbridge-webcomponents-vue/icons/ObiApplicationOpenGoogle.vue'
import ObcElevatedCard from '@oicl/openbridge-webcomponents-vue/components/elevated-card/ObcElevatedCard.vue'
import { ObcElevatedCardSize } from '@oicl/openbridge-webcomponents/dist/components/elevated-card/elevated-card'
</script>

<template>
  <div class="wrapper">
    <h1 class="font-ui-body-active">Explore</h1>
    <OpenBridgeLogo class="logo" />
    <ObcElevatedCard
      class="card first"
      href="https://openbridge.no"
      full-width
      :size="ObcElevatedCardSize.MultiLine"
      has-trailing-icon
    >
      <template #label><div>Visit website</div></template>
      <template #description> Learn more about OpenBridge </template>
      <template #trailing-icon>
        <ObiApplicationOpenGoogle></ObiApplicationOpenGoogle>
      </template>
    </ObcElevatedCard>
    <ObcElevatedCard
      class="card"
      href="https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents"
      full-width
      :size="ObcElevatedCardSize.MultiLine"
      has-trailing-icon
    >
      <template #label><div>GitHub Repository</div></template>
      <template #description> Visit GitHub repository </template>
      <template #trailing-icon>
        <ObiApplicationOpenGoogle></ObiApplicationOpenGoogle>
      </template>
    </ObcElevatedCard>
    <ObcElevatedCard class="card last" has-graphic not-clickable>
      <template #graphic>
        <QrCode class="qr-code" />
      </template>
      <template #label
        ><div class="label">
          <span class="font-ui-body-active">Scan</span> to open on Mobile
        </div></template
      >
    </ObcElevatedCard>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 48px;
  padding-top: 8px;

  color: var(--element-active-color);

  h1 {
    margin-bottom: 4px;
    margin-top: 32px;
  }

  .card {
    width: 100%;
    max-width: 320px;
  }

  .card.first,
  .card.last {
    margin-top: 32px;
    margin-bottom: 8px;
  }

  .qr-code {
    box-sizing: border-box;
    padding: 16px 16px 0;
    width: 100%;
    height: 100%;
    color: var(--element-active-color);
  }

  .label {
    text-align: center;
    width: 100%;
  }
}

.logo {
  color: var(--element-active-color);
}
</style>

<style>
obc-elevated-card.last::part(label) {
  width: 100%;
}
</style>
