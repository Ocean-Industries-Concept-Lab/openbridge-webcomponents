<template>
  <div class="joystick-view">
    <h2>Joystick Demo</h2>
    <JoystickControl />
  </div>
</template>

<script setup lang="ts">
import JoystickControl from '../components/JoystickControl.vue'
</script>

<style scoped>
.joystick-view {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
}
</style>

