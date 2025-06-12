<template>
    <div class="container">
        <h1>Zoom: {{ demoConfigStore.zoomLevel }}</h1>
        <ObcSlider :value="demoConfigStore.zoomLevel" :min=".1" :max="2" :step=".001" @value="onZoomLevelChange" />
        <div class="ruler">
            <div class="ruler-line">
                <div class="tick" :style="{ left: 0 }"><span>cm</span></div>
                <div class="tick" v-for="i in 50" :key="i" :style="{ left: `${i * 32}px` }"><span>{{ i }}</span></div>
            </div>
        </div>
        <div class="credit-card">
            <div class="chip"></div>
        </div>
    </div>
        
</template>

<script setup lang="ts">
import ObcSlider from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/slider/ObcSlider.vue';
import { useDemoConfigStore } from '@/stores/demoConfig';

const demoConfigStore = useDemoConfigStore();

function onZoomLevelChange(value: CustomEvent<number>) {
    demoConfigStore.zoomLevel = value.detail;
}
</script>

<style scoped>
.container {
    padding: 20px;

}

.ruler {
    position: relative;
    width: 100%;
    padding: 40px 0;
    overflow: visible;
}

.ruler-line {
    width: 100%;
    height: 2px;
    background-color: #000;
    position: relative;
}

.tick {
    position: absolute;
    width: 2px;
    height: 10px;
    background-color: #000;
    top: -4px;
    transform: translateX(-50%);
}

.tick span {
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 12px;
    color: #000;
    white-space: nowrap;
}

.ruler-text {
    position: absolute;
    top: 20px;
    left: 0;
    font-size: 14px;
    color: #000;
}

.credit-card {
    width: 273.92px;
    height: 172.736px;
    background: linear-gradient(45deg, #1a1a1a, #4a4a4a);
    border-radius: 10px;
    position: relative;
    margin: 40px auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.chip {
    position: absolute;
    width: 45px;
    height: 35px;
    background: linear-gradient(45deg, #d4af37, #f4cf47);
    border-radius: 5px;
    top: 50%;
    left: 30px;
    transform: translateY(-50%);
}
</style>