<script setup lang="ts">
import ObcCompass from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/navigation-instruments/compass/ObcCompass.vue'
import { type Sim } from '../composables/useSim'
import type { WeatherData } from '@/business/getWeather';
import { VesselImage } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/watch/vessel'
import { computed, defineProps } from 'vue';
import ObcInstrumentField from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/navigation-instruments/instrument-field/ObcInstrumentField.vue'
import { InstrumentFieldSize } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/instrument-field/instrument-field'
const props = defineProps<{
    sim: Sim,
    weather: WeatherData
}>();

function mapTo360Degrees(value: number) {
    return (value + 360) % 360;
}

const rotationsPerMinute = computed(() => props.sim.vessel.r.value * 60);
const degPerMinute = computed(() => {
    const rRadPerSecond = props.sim.vessel.r.value;
    const degPerSecond = rRadPerSecond * 180 / Math.PI;
    return degPerSecond * 60;
});

// Take degrees and return dd* mm.mmm'
function formatDegrees(value: number) {
    const degrees = Math.floor(value);
    const minutes = ((value - degrees) * 60).toFixed(3);
    return `${degrees}° ${minutes}'`;
}

const north = computed(() => {
    const n = 63.43 + props.sim.vessel.north.value / 1852 / 60;
    return formatDegrees(n);
});

const east = computed(() => {
    const e = 9.92 + props.sim.vessel.east.value / 1852 / 60;
    return formatDegrees(e);
});

const windSpeedKnots = computed(() => {
    // Convert from m/s to knots
    return props.weather.windSpeed * 1.94384;
});
</script>

<template>
    <div class="container-own-ship">
        <div class="readout left">
            <ObcInstrumentField
                :value="mapTo360Degrees(sim.vessel.headingDeg.value)"
                :size="InstrumentFieldSize.enhanced"
                unit="DEG"
                tag="HDG"
            />
            <ObcInstrumentField
                :value="mapTo360Degrees(sim.vessel.courseOverGroundDeg.value)"
                :size="InstrumentFieldSize.enhanced"
                unit="DEG"
                tag="COG"
            />
            <ObcInstrumentField
                :value="degPerMinute"
                :size="InstrumentFieldSize.enhanced"
                unit="DEG/min"
                tag="ROT"
            />
            <div class="divider"></div>
            <div class="position">
                <div class="row">
                    <div class="value font-instrument-value-regular">{{ north }}</div><div class="unit font-instrument-label">N</div>
                </div>
                <div class="row">
                    <div class="value font-instrument-value-regular">{{ east }}</div><div class="unit font-instrument-label">E</div>
                </div>
            </div>
        </div>
        <ObcCompass
            class="compass"
          :heading="sim.vessel.headingDeg.value"
          :course-over-ground="sim.vessel.courseOverGroundDeg.value"
          :rotations-per-minute="rotationsPerMinute"
          :vessel-image="VesselImage.psvTop"
          :current-from-direction="props.sim.currentFromAngleDeg"
          :current-speed="props.sim.currentSpeedKnots"
          :wind-speed="props.weather.windSpeedBeaufort"
          :wind-from-direction="props.weather.windDirection"
        />       
        <div class="readout right">
            <div class="title font-ui-label">Wind</div>
            <ObcInstrumentField
                :value="windSpeedKnots"
                :size="InstrumentFieldSize.enhanced"
                unit="KN"
                tag="Speed"
                neutral-color
                :fraction-digits="1"
                :max-digits="4"
            />
            <ObcInstrumentField
                :value="props.weather.windDirection"
                :size="InstrumentFieldSize.enhanced"
                unit="DEG"
                tag="Direction"
                neutral-color
            />
            <div class="divider"></div>
            <div class="title font-ui-label">Current</div>
            <ObcInstrumentField
                :value="props.sim.currentSpeedKnots"
                :size="InstrumentFieldSize.enhanced"
                unit="KN"
                tag="Speed"
                neutral-color
                :fraction-digits="1"
                :max-digits="4"
            />
            <ObcInstrumentField
                :value="props.sim.currentFromAngleDeg"
                :size="InstrumentFieldSize.enhanced"
                unit="DEG"
                tag="Direction"
                neutral-color
            />
        </div>
    </div>
</template>

<style scoped>
.container-own-ship {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0 16px;
    anchor-name: --container-own-ship;
}

.readout {
    width: fit-content;
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: center;
    gap: 16px;
}

.readout.right {
    gap: 8px;
}

.readout.right .divider {
    margin-top: 8px;
    margin-bottom: 8px;
}

.title {
    align-self: start;
    color: var(--element-neutral-color);
}

.position {
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: center;
    gap: 4px;
    width: fit-content;
}

.row {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: end;
    width: fit-content;
}

.value {
    white-space: nowrap;
    color: var(--element-neutral-color);
}

.unit {
    color: var(--instrument-regular-secondary-color);
    width: 16px;
}

.divider {
    width: 100%;
    height: 1px;
    background-color: var(--border-outline-color);
}

.compass {
    max-width: calc(50vh - 50px);
}
</style>