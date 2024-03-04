<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
  <RouterLink :to="props.to" v-slot="{ navigate, isActive }">
    <obc-navigation-item :label="props.label" @click="onClick(navigate)" :checked="isActive">
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
  label: String,
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
