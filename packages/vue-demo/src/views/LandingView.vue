<script setup lang="ts">
import { useConfigStore } from '@/stores/config'
import InstrumentDemo from './InstrumentDemo.vue'
import { computed } from 'vue'
import { useBridgeStore } from '@/stores/bridge'
const configStore = useConfigStore()
const selectedPage = computed(() => configStore.page)

const bridgeStore = useBridgeStore()
const palette = computed(() => bridgeStore.palette)
</script>

<template>
  <InstrumentDemo v-if="!configStore.hasConfig" />
  <iframe
    :class="{ 'content-iframe': true, 'content-iframe--current': palette === 'bright' }"
    v-if="selectedPage"
    :src="selectedPage.url.brightUrl"
    width="100%"
    height="100%"
    frameborder="0"
  ></iframe>
  <iframe
    v-if="selectedPage"
    :class="{ 'content-iframe': true, 'content-iframe--current': palette === 'day' }"
    :src="selectedPage.url.dayUrl"
    width="100%"
    height="100%"
    frameborder="0"
  ></iframe>
  <iframe
    v-if="selectedPage"
    :class="{ 'content-iframe': true, 'content-iframe--current': palette === 'dusk' }"
    :src="selectedPage.url.duskUrl"
    width="100%"
    height="100%"
    frameborder="0"
  ></iframe>
  <iframe
    v-if="selectedPage"
    :class="{ 'content-iframe': true, 'content-iframe--current': palette === 'night' }"
    :src="selectedPage.url.nightUrl"
    width="100%"
    height="100%"
    frameborder="0"
  ></iframe>
</template>

<style scoped>
.content-iframe {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
}

.content-iframe--current {
  z-index: 0;
}
</style>
