<script setup lang="ts">
import ObcSpeedArrows from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/navigation-instruments/speed-arrows/ObcSpeedArrows.vue'
import { Direction, ActiveColor } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/speed-arrows/speed-arrows';
import ObcThruster from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/navigation-instruments/thruster/ObcThruster.vue';
import { InstrumentState } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/types';
import ObcAzimuthThruster from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/navigation-instruments/azimuth-thruster/ObcAzimuthThruster.vue';
import ObcMainEngine from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/navigation-instruments/main-engine/ObcMainEngine.vue';
import ObcRudder from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/navigation-instruments/rudder/ObcRudder.vue';
import ObcInstrumentField from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/navigation-instruments/instrument-field/ObcInstrumentField.vue';
import { InstrumentFieldSize } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/instrument-field/instrument-field';
defineProps<{
  angle?: number
  angleSetpoint?: number
  thrust?: number
  thrustSetpoint?: number
}>()
</script>

<template>
    <div class="propulsion-container">
        <div class="vessel-image">
            <svg width="236" height="920" viewBox="50 0 236 920" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M81.769 424.635L81.769 218.171C81.769 8.08435 168 8.08435 168 8.08435C168 8.08435 254.232 8.08434 254.232 218.171L254.232 493.456L254.232 897.141C254.232 898.245 253.336 899.141 252.232 899.141L232.674 899.141L103.327 899.141L83.769 899.141C82.6645 899.141 81.769 898.245 81.769 897.141L81.769 424.635Z" fill="var(--instrument-frame-primary-color)"/>
                <path d="M81.769 424.635L110.513 381.169L110.513 344.947L229.081 344.947L229.081 468.101L254.232 493.456M254.232 493.456L254.232 897.141C254.232 898.245 253.336 899.141 252.232 899.141L232.674 899.141L103.327 899.141L83.769 899.141C82.6645 899.141 81.769 898.245 81.769 897.141L81.769 218.171C81.769 8.08435 168 8.08434 168 8.08434C168 8.08434 254.232 8.08434 254.232 218.171L254.232 493.456Z" stroke="var(--instrument-tick-mark-tertiary-color)" style="stroke:var(--instrument-tick-mark-tertiary-color)"/>
                <path d="M110.513 302.708L67.397 302.708L67.397 245.22L110.513 216.477L139.256 144.617L196.744 144.617L225.488 216.477L268.603 245.22L268.603 302.708L225.488 302.708L203.93 324.266L132.07 324.266L110.513 302.708Z" fill="var(--instrument-frame-primary-color)"/>
                <path d="M132.07 324.266L110.513 302.708L67.397 302.708L67.397 245.22L110.513 216.477L139.256 144.617M132.07 324.266L203.93 324.266M132.07 324.266L132.07 223.662C133.753 195.51 139.256 144.617 139.256 144.617M203.93 324.266L225.488 302.708L268.603 302.708L268.603 245.22L225.488 216.477L196.744 144.617M203.93 324.266L203.93 223.662C202.247 195.51 196.744 144.617 196.744 144.617M196.744 144.617L139.256 144.617" stroke="var(--instrument-tick-mark-tertiary-color)" style="stroke:var(--instrument-tick-mark-tertiary-color)"/>
                <path d="M203.93 265.979L203.93 301.909L189.558 309.095L146.442 309.095L132.07 301.909L132.07 265.979L146.442 287.537L189.558 287.537L203.93 265.979Z" fill="var(--instrument-frame-primary-color)"/>
                <path d="M189.558 287.537L203.93 265.979L203.93 301.909L189.558 309.095M189.558 287.537L146.442 287.537M189.558 287.537L189.558 309.095M146.442 287.537L132.07 265.979L132.07 301.909L146.442 309.095M146.442 287.537L146.442 309.095M146.442 309.095L189.558 309.095" stroke="var(--instrument-tick-mark-tertiary-color)"/>
                <rect x="110" y="80" width="120" height="100" fill="var(--instrument-frame-primary-color)" />

            </svg>
            <div class="speed-arrows-container">
                <ObcSpeedArrows 
                    :speed-knots="1.1" 
                    :direction="Direction.left" 
                    :n-active-arrows="1" 
                    :active-color="ActiveColor.Regular" 
                    :tinted-arrows="true" 
                    :readout="true" 
                    :max-digits="2" 
                    :fraction-digits="1"
                />
                <ObcSpeedArrows 
                    :speed-knots="0" 
                    :direction="Direction.forward" 
                    :n-active-arrows="0" 
                    :active-color="ActiveColor.Regular" 
                    :tinted-arrows="true" 
                    :readout="true" 
                    :max-digits="2" 
                    :fraction-digits="0"
                />

                <ObcSpeedArrows 
                    :speed-knots="1.1" 
                    :direction="Direction.right" 
                    :n-active-arrows="1" 
                    :active-color="ActiveColor.Regular" 
                    :tinted-arrows="true" 
                    :readout="true" 
                    :max-digits="2" 
                    :fraction-digits="1"
                />

            </div>
        </div>
        <div class="fore-instruments">
            <ObcThruster
                tunnel
                single-sided
                :setpoint="0"
                :state="InstrumentState.off"
            />
        </div>
        <div class="center-instruments">
            <ObcAzimuthThruster
                :state="InstrumentState.off"
                :angle="0"
                :angle-setpoint="0"
                :thrust="0"
                :thrust-setpoint="0"
            />
        </div>
        <ObcMainEngine
            class="main-engine-1"
            :state="InstrumentState.inCommand"
            :thrust="72"
            :thrust-setpoint="72"
            :speed="49"
            :speed-setpoint="49"
        />
        <ObcMainEngine
            class="main-engine-2"
            :state="InstrumentState.inCommand"
            :thrust="72"
            :thrust-setpoint="72"
            :speed="49"
            :speed-setpoint="49"
        />
        <ObcRudder
            class="rudder-1"
            :state="InstrumentState.inCommand"
            :angle="10"
            :setpoint="10"
            />
        <ObcRudder
            class="rudder-2"
            :state="InstrumentState.inCommand"
            :angle="10"
            :setpoint="10"
            />
            <div class="divider"></div>
        <div class="divider r2"></div>
        <div class="divider r3"></div>
        <div class="tunnel-index readout-container single">
            <div class="index font-ui-label-active">1</div>
            <div class="title font-ui-label">Tunnel thruster</div>
            <ObcInstrumentField
                :value="30"
                :size="InstrumentFieldSize.enhanced"
                neutral-color
                off
                />
                <ObcInstrumentField
                class="field-unit"
                unit="%"
                tag="Power"
                label-only
                horizontal
               
                :size="InstrumentFieldSize.enhanced"
                />
        </div>
        <div class="azimuth-index readout-container single">
            <div class="index font-ui-label-active">2</div>
            <div class="title font-ui-label">Azimuth</div>
            <ObcInstrumentField
                :value="0"
                :max-digits="1"
                :size="InstrumentFieldSize.enhanced"
                neutral-color
                />
                <ObcInstrumentField
                class="field-unit"
                unit="DEG"
                tag="Angle"
                label-only
                horizontal
                :size="InstrumentFieldSize.enhanced"
                />
            <ObcInstrumentField
                off
                :size="InstrumentFieldSize.enhanced"
                />
                <ObcInstrumentField
                class="field-unit"
                unit="%"
                tag="Power"
                label-only
                horizontal
                :size="InstrumentFieldSize.enhanced"
                />
        </div>
        <div class="main-engine-index readout-container double">
            <div class="index font-ui-label-active">3</div>
            <div class="index font-ui-label-active">4</div>
            <div class="title font-ui-label">Main engines</div>
            <ObcInstrumentField
                :value="30"
                :setpoint="45"
                has-setpoint
                :size="InstrumentFieldSize.enhanced"
                />
            <ObcInstrumentField
                :value="30"
                :setpoint="45"
                has-setpoint
                :size="InstrumentFieldSize.enhanced"
                />
                <ObcInstrumentField
                class="field-unit"
                unit="%"
                tag="Pitch"
                label-only
                horizontal
                :size="InstrumentFieldSize.enhanced"
                />
            <ObcInstrumentField
                :value="30"
                :setpoint="45"
                has-setpoint
                :size="InstrumentFieldSize.enhanced"
                />
            <ObcInstrumentField
                :value="30"
                :setpoint="45"
                has-setpoint
                :size="InstrumentFieldSize.enhanced"
                />
                <ObcInstrumentField
                class="field-unit"
                unit="RPM"
                tag="Speed"
                label-only
                horizontal
                :size="InstrumentFieldSize.enhanced"
                />
        </div>
        <div class="rudder-index readout-container double">
            <div class="index font-ui-label-active">5</div>
            <div class="index font-ui-label-active">6</div>
            <div class="title font-ui-label">Rudders</div>
            <ObcInstrumentField
                :value="30"
                :setpoint="45"
                has-setpoint
                :size="InstrumentFieldSize.enhanced"
                />
            <ObcInstrumentField
                :value="30"
                :setpoint="45"
                has-setpoint
                :size="InstrumentFieldSize.enhanced"
                />

                <ObcInstrumentField
                class="field-unit"
                unit="DEG"
                tag="Angle"
                label-only
                horizontal
                :size="InstrumentFieldSize.enhanced"
                />
        </div>

    </div>

</template>

<style scoped>
.propulsion-container {
    position: relative;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr min-content min-content;
    grid-template-rows: repeat(4, 1fr);
    justify-content: center;
    justify-items: space-between;
    align-items: center;
}

.vessel-image {
    position: relative;
    grid-column: 1 / 2;
    grid-row: 1 / 5;
    display: flex;
    justify-content: center;
    align-items: center;
}

.fore-instruments {
    grid-column: 2 / 4;
    grid-row: 1 / 2;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    justify-self: center;
}

.center-instruments {
    grid-column: 2 / 4;
    grid-row: 2 / 3;
    width: 100%;
    height: 80%;
}

.main-engine-1 {
    grid-column: 2 / 3;
    grid-row: 3 / 4;
    width: 100%;
    height: 100%;
}

.main-engine-2 {
    grid-column: 3 / 4;
    grid-row: 3 / 4;
    width: 100%;
    height: 100%;
}

.rudder-1 {
    grid-column: 2 / 3; 
    grid-row: 4 / 5;
    width: 100%;
    height: 100%;
}

.rudder-2 {
    grid-column: 3 / 4;
    grid-row: 4 / 5;
    width: 100%;
    height: 100%;
}

.speed-arrows-container {
    position: absolute;
    top: 3%;
    left: 0;
    right: 0;
    bottom: 7%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

.readout-container {
    justify-self: flex-end;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    padding-right: 16px;
}

.readout-container.single {
    grid-template-columns: 1fr 1fr;
}

.tunnel-index {
    grid-row: 1 / 2;
    grid-column: -2 / -1;
}

.azimuth-index {
    grid-row: 2 / 3;
    grid-column: -2 / -1;
}

.main-engine-index {
    grid-row: 3 / 4;
    grid-column: -2 / -1;
}

.rudder-index {
    grid-row: 4 / 5;
    grid-column: -2 / -1;
}

.index {
    justify-self: center;
    box-sizing: border-box;
    height: 18px;
    width: 18px;
    border-radius: 100%;
    border: 1px solid var(--base-blue-200);
    background: var(--base-blue-050);
    color: var(--base-blue-500);
    text-align: center;
}

.title {
    color: var(--element-neutral-color);
    justify-self: start;
    white-space: nowrap;
}

.field-unit {
    margin-left: -8px;
    align-self: end;
    justify-self: start;
}

.divider {
    grid-column: 2 / -1;
    grid-row: 1 / 2;
    width: 100%;
    height: 100%;
    border-bottom: 1px solid var(--border-outline-color);
}

.divider.r2 {
    grid-row: 2 / 3;
}

.divider.r3 {
    grid-row: 3 / 4;
}

obc-instrument-field {
    justify-self: end;
}

</style> 