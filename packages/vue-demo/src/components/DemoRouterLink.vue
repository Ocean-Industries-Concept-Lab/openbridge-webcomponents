<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
  <RouterLink v-slot="{ navigate, isActive }" :to="props.to">
    <obc-navigation-item :label="props.label" :checked="isActive" @click="onClick(navigate)">
      <template slot="icon">
        <slot></slot>
      </template>
    </obc-navigation-item>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

const emits = defineEmits(['click'])

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  to: {
    type: [String, Object],
    required: true
  }
})

function onClick(callback: () => void) {
  emits('click')
  callback()
}
</script>
