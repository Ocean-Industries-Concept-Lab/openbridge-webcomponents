<template>
  <ObcCommandMenu
    class="command-menu"
    :in-command="demoConfigStore.hasCommand"
    :hide-location="demoConfigStore.hasCommand"
    @change="$emit('change', $event)"
  >
    <div slot="command-icon">
      <obi-joystick v-if="demoConfigStore.hasCommand"></obi-joystick>
      <obi-command-no v-else></obi-command-no>
    </div>
    <div slot="command-status">
      {{ demoConfigStore.hasCommand ? 'Joystick' : 'NO CMD' }}
    </div>
    <div slot="command-description">
      {{ demoConfigStore.hasCommand ? 'Lillestrøm' : 'CMD at ROC' }}
    </div>
    <div slot="command-location">Ålesund</div>
    <div slot="toogle-action-to-in-command-label">Take</div>
    <div slot="toogle-action-to-no-command-label">Release</div>
    <div slot="toogle-state-in-command-label">In CMD</div>
    <div slot="toogle-state-no-command-label">ROC</div>
  </ObcCommandMenu>
</template>

<script setup lang="ts">
import ObcCommandMenu from '@oicl/openbridge-webcomponents-vue/components/command-menu/ObcCommandMenu.vue'
import { useDemoConfigStore } from '../stores/demoConfig'

defineEmits<{
  change: [event: CustomEvent]
}>()

const demoConfigStore = useDemoConfigStore()
</script>

<style scoped>
@position-try --stick-right {
  right: 4px;
  left: auto;
}

.command-menu {
  position: fixed;
  position-anchor: --command-button;
  position-try: --stick-right;
  top: calc(anchor(bottom) + 4px);
  left: calc(anchor(left) + 8px);
}
</style>
