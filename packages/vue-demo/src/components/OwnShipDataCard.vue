<template>
    <ObcCard>
        <div slot="title">Own ship data</div>
        <div class="side-panel-card">
            <ObcCompassIndicator class="indicator" :angle="sim.vessel.headingDeg.value" :arrow="CompassIndicatorArrow.Heading">
            </ObcCompassIndicator>
            <ObcInstrumentField class="field" :max-digits="3" :value="mapTo360Degrees(sim.vessel.headingDeg.value)" :size="InstrumentFieldSize.enhanced" unit="DEG" tag="HDG" horizontal has-src :src="headingSrc" has-src-picker>
                <obc-navigation-item slot="src-picker-content" label="GYR1" @click="headingSrc = 'GYR1'"></obc-navigation-item>
                <obc-navigation-item slot="src-picker-content" label="GYR2" @click="headingSrc = 'GYR2'"></obc-navigation-item>
                <obc-navigation-item slot="src-picker-content" label="GPS1" @click="headingSrc = 'GPS1'"></obc-navigation-item>
            </ObcInstrumentField>
            <ObcCompassIndicator class="indicator" :angle="sim.vessel.courseOverGroundDeg.value" :arrow="CompassIndicatorArrow.Course" src="GPS1"/>
            <ObcInstrumentField class="field" :max-digits="3" :value="mapTo360Degrees(sim.vessel.courseOverGroundDeg.value)" :size="InstrumentFieldSize.enhanced" unit="DEG" tag="COG" horizontal has-src src="GPS1" has-src-picker>
                <obc-navigation-item slot="src-picker-content" label="GYR1" @click="courseOverGroundSrc = 'GYR1'"></obc-navigation-item>
                <obc-navigation-item slot="src-picker-content" label="GYR2" @click="courseOverGroundSrc = 'GYR2'"></obc-navigation-item>
                <obc-navigation-item slot="src-picker-content" label="GPS1" @click="courseOverGroundSrc = 'GPS1'"></obc-navigation-item>
            </ObcInstrumentField>
            <ObcRotIndicator class="indicator" :rotations-per-minute="sim.vessel.rotationDegPerMinute.value" />
            <ObcInstrumentField class="field" :max-digits="3" :value="sim.vessel.rotationDegPerMinute.value" :size="InstrumentFieldSize.enhanced" unit="DEG/min" tag="ROT" horizontal has-src src="GYR1" has-src-picker>
                <obc-navigation-item slot="src-picker-content" label="GYR1" @click="rotationSrc = 'GYR1'"></obc-navigation-item>
                <obc-navigation-item slot="src-picker-content" label="GYR2" @click="rotationSrc = 'GYR2'"></obc-navigation-item>
            </ObcInstrumentField>
            <div class="divider"></div>
            <ObcSpeedIndicator class="indicator" :speed="sim.vessel.speedForwardThroughWaterKnots.value" :max-speed="20" />
            <ObcInstrumentField class="field" :max-digits="3" :value="sim.vessel.speedForwardThroughWaterKnots.value" :size="InstrumentFieldSize.enhanced" unit="KN" tag="STW" horizontal has-src src="GYR1" has-src-picker>
                <obc-navigation-item slot="src-picker-content" label="GYR1" @click="speedSrc = 'GYR1'"></obc-navigation-item>
                <obc-navigation-item slot="src-picker-content" label="GYR2" @click="speedSrc = 'GYR2'"></obc-navigation-item>
            </ObcInstrumentField>
            <ObcGraphMini :data="depthDataLast30" class="indicator" :max-y="0" />
            <ObcInstrumentField class="field" :max-digits="3" :value="sim.depth.value" :size="InstrumentFieldSize.enhanced" unit="m" tag="Depth" horizontal has-src src="ECH1" has-src-picker>
                <obc-navigation-item slot="src-picker-content" label="ECH1" @click="depthSrc = 'ECH1'"></obc-navigation-item>
                <obc-navigation-item slot="src-picker-content" label="ECH2" @click="depthSrc = 'ECH2'"></obc-navigation-item>
            </ObcInstrumentField>
            
            <div class="divider"></div>
            <div class="position field">
                <div class="row">
                    <div class="value font-instrument-value-regular">{{ north }}</div><div class="unit font-instrument-label">N</div>
                </div>
                <div class="row">
                    <div class="value font-instrument-value-regular">{{ east }}</div><div class="unit font-instrument-label">E</div>
                </div>
            </div>
        </div>
    </ObcCard>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useSim } from '@/composables/useSim';
import ObcCard from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/card/ObcCard.vue';
import ObcInstrumentField from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/navigation-instruments/instrument-field/ObcInstrumentField.vue';
import { InstrumentFieldSize } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/instrument-field/instrument-field';
import { CompassIndicatorArrow } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/compass-indicator/compass-indicator';
import ObcCompassIndicator from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/navigation-instruments/compass-indicator/ObcCompassIndicator.vue';
import ObcRotIndicator from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/navigation-instruments/rot-indicator/ObcRotIndicator.vue';
import ObcSpeedIndicator from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/navigation-instruments/speed-indicator/ObcSpeedIndicator.vue';
import ObcGraphMini from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/navigation-instruments/graph-mini/ObcGraphMini.vue';
import ObcNavigationItem from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/navigation-item/ObcNavigationItem.vue';

const sim = useSim();
const headingSrc = ref('GYR1');
const courseOverGroundSrc = ref('GPS1');
const rotationSrc = ref('GYR1');
const speedSrc = ref('GYR1');
const depthSrc = ref('ECH1');


function mapTo360Degrees(value: number) {
    return (value % 360 + 360) % 360;
}

// Take degrees and return dd* mm.mmm'
function formatDegrees(value: number) {
    const degrees = Math.floor(value);
    const minutes = ((value - degrees) * 60).toFixed(3);
    return `${degrees}° ${minutes}'`;
}

const north = computed(() => {
    const n = sim.north.value;
    return formatDegrees(n);
});

const east = computed(() => {
    const e = sim.east.value;
    return formatDegrees(e);
});

const depthDataLast30 = computed(() => {
    const [xData, yData] = sim.depthData.value;
    const last30X = xData.slice(-30);
    const last30Y = yData.slice(-30).map(y => -y);
    return [last30X, last30Y] as [number[], number[]];
});
</script>

<style scoped>
.divider {
    height: 1px;
    width: 100%;
    margin: 8px 0px;
    background: var(--border-outline-color);
    grid-column: 1 / 3;
}

.side-panel-card {
    width: 100%;
    padding: 16px;
    display: grid;
    grid-template-columns: min-content 1fr;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    --obc-instrument-field-source-width: 80px;
    --obc-instrument-field-tag-width: 50px;
}

.field {
    grid-column: 2 / 3;
    justify-self: end;
}

.indicator {
    grid-column: 1 / 2;
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
</style> 