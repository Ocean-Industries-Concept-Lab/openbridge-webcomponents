<template>
  <div class="joystick-container">
    <h3>Joystick Output</h3>
    <div class="joystick-output">
      <span>X: {{ x }}</span>
      <span>Y: {{ y }}</span>
    </div>
    <div v-if="!gamepadConnected" class="joystick-status">No joystick detected. Connect and press any button.</div>
  </div>
</template>

<script setup lang="ts">
import { useJoystickControl } from '../composables/useJoystickControl'

const { x, y, gamepadConnected } = useJoystickControl()
</script>

<style scoped>
.joystick-container {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  max-width: 300px;
  margin: 1rem auto;
  background: #fafafa;
}
.joystick-output {
  font-size: 1.2rem;
  display: flex;
  gap: 1rem;
  margin-bottom: 0.5rem;
}
.joystick-status {
  color: #888;
  font-size: 0.9rem;
}
</style> 