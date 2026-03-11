<template>
  <ObcCard>
    <div slot="title">Own ship data</div>
    <div class="side-panel-card">
      <ObcCompassIndicator
        class="indicator"
        :angle="sim.vessel.headingDeg.value"
        :arrow="CompassIndicatorArrow.Heading"
        :show-labels="true"
      >
      </ObcCompassIndicator>
      <ObcInstrumentField
        class="field"
        :max-digits="3"
        :value="mapTo360Degrees(sim.vessel.headingDeg.value)"
        :size="InstrumentFieldSize.enhanced"
        unit="DEG"
        tag="HDG"
        horizontal
        has-src
        :src="headingSrc"
        has-src-picker
      >
        <obc-navigation-item
          slot="src-picker-content"
          label="GYR1"
          @click="headingSrc = 'GYR1'"
        ></obc-navigation-item>
        <obc-navigation-item
          slot="src-picker-content"
          label="GYR2"
          @click="headingSrc = 'GYR2'"
        ></obc-navigation-item>
        <obc-navigation-item
          slot="src-picker-content"
          label="GPS1"
          @click="headingSrc = 'GPS1'"
        ></obc-navigation-item>
      </ObcInstrumentField>
      <ObcCompassIndicator
        class="indicator"
        :angle="sim.vessel.courseOverGroundDeg.value"
        :arrow="CompassIndicatorArrow.Course"
        src="GPS1"
      />
      <ObcInstrumentField
        class="field"
        :max-digits="3"
        :value="mapTo360Degrees(sim.vessel.courseOverGroundDeg.value)"
        :size="InstrumentFieldSize.enhanced"
        unit="DEG"
        tag="COG"
        horizontal
        has-src
        src="GPS1"
        has-src-picker
      >
        <obc-navigation-item
          slot="src-picker-content"
          label="GYR1"
          @click="courseOverGroundSrc = 'GYR1'"
        ></obc-navigation-item>
        <obc-navigation-item
          slot="src-picker-content"
          label="GYR2"
          @click="courseOverGroundSrc = 'GYR2'"
        ></obc-navigation-item>
        <obc-navigation-item
          slot="src-picker-content"
          label="GPS1"
          @click="courseOverGroundSrc = 'GPS1'"
        ></obc-navigation-item>
      </ObcInstrumentField>
      <ObcRotIndicator
        class="indicator"
        :rotations-per-minute="sim.vessel.rotationDegPerMinute.value"
      />
      <ObcInstrumentField
        class="field"
        :max-digits="3"
        :value="sim.vessel.rotationDegPerMinute.value"
        :size="InstrumentFieldSize.enhanced"
        unit="DEG/min"
        tag="ROT"
        horizontal
        has-src
        src="GYR1"
        has-src-picker
      >
        <obc-navigation-item
          slot="src-picker-content"
          label="GYR1"
          @click="rotationSrc = 'GYR1'"
        ></obc-navigation-item>
        <obc-navigation-item
          slot="src-picker-content"
          label="GYR2"
          @click="rotationSrc = 'GYR2'"
        ></obc-navigation-item>
      </ObcInstrumentField>
      <div class="divider"></div>
      <ObcSpeedIndicator
        class="indicator"
        :speed="sim.vessel.speedForwardThroughWaterKnots.value"
        :max-speed="20"
      />
      <ObcInstrumentField
        class="field"
        :max-digits="3"
        :value="sim.vessel.speedForwardThroughWaterKnots.value"
        :size="InstrumentFieldSize.enhanced"
        unit="KN"
        tag="STW"
        horizontal
        has-src
        src="GYR1"
        has-src-picker
      >
        <obc-navigation-item
          slot="src-picker-content"
          label="GYR1"
          @click="speedSrc = 'GYR1'"
        ></obc-navigation-item>
        <obc-navigation-item
          slot="src-picker-content"
          label="GYR2"
          @click="speedSrc = 'GYR2'"
        ></obc-navigation-item>
      </ObcInstrumentField>
      <ObcGraphMini :data="depthDataLast30" class="indicator" :max-y="0" />
      <ObcInstrumentField
        class="field"
        :max-digits="3"
        :value="sim.depth.value"
        :size="InstrumentFieldSize.enhanced"
        unit="m"
        tag="Depth"
        horizontal
        has-src
        src="ECH1"
        has-src-picker
      >
        <obc-navigation-item
          slot="src-picker-content"
          label="ECH1"
          @click="depthSrc = 'ECH1'"
        ></obc-navigation-item>
        <obc-navigation-item
          slot="src-picker-content"
          label="ECH2"
          @click="depthSrc = 'ECH2'"
        ></obc-navigation-item>
      </ObcInstrumentField>

      <div class="divider"></div>
      <svg
        class="indicator"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="24"
          cy="24"
          r="18"
          fill="var(--instrument-frame-primary-color)"
          stroke="var(--instrument-frame-tertiary-color)"
        />
        <path
          d="M42 24C42 28.9706 33.9411 33 24 33C14.0589 33 6 28.9706 6 24"
          stroke="var(--instrument-frame-tertiary-color)"
        />
        <path
          d="M42 24C42 19.0294 33.9411 15 24 15C14.0589 15 6 19.0294 6 24"
          stroke="var(--instrument-frame-tertiary-color)"
        />
        <path
          d="M42 24C42 19.0294 33.9411 15 24 15C14.0589 15 6 19.0294 6 24"
          stroke="var(--instrument-frame-tertiary-color)"
        />
        <path
          d="M24 42C28.9706 42 33 33.9411 33 24C33 14.0589 28.9706 6 24 6"
          stroke="var(--instrument-frame-tertiary-color)"
        />
        <path
          d="M24 42C19.0294 42 15 33.9411 15 24C15 14.0589 19.0294 6 24 6"
          stroke="var(--instrument-frame-tertiary-color)"
        />
        <mask
          id="mask0_127_7735"
          style="mask-type: luminance"
          maskUnits="userSpaceOnUse"
          x="5"
          y="5"
          width="38"
          height="38"
        >
          <circle cx="24" cy="24" r="18" fill="white" stroke="black" />
        </mask>
        <g mask="url(#mask0_127_7735)">
          <path
            d="M-208.8 23V25M-205.89 23V25M-202.98 23V25M-200.07 23V25M-197.16 23V25M-194.25 23V25M-191.34 23V25M-188.43 23V25M-185.52 23V25M-182.61 23V25M-179.7 23V25M-176.79 23V25M-173.88 23V25M-170.97 23V25M-168.06 23V25M-165.15 23V25M-159.33 23V25M-153.51 23V25M-162.24 23V25M-156.42 23V25M-150.6 23V25M-214.62 23V25M-211.71 23V25M-220.44 23V25M-217.53 23V25M-226.26 23V25M-223.35 23V25M-232.08 23V25M-229.17 23V25M-237.9 23V25M-234.99 23V25M-243.72 23V25M-249.54 23V25M-255.36 23V25M-261.18 23V25M-267 23V25M-264.09 23V25M-258.27 23V25M-252.45 23V25M-246.63 23V25M-240.81 23V25M-92.4 23V25M-89.49 23V25M-86.58 23V25M-83.67 23V25M-80.76 23V25M-77.85 23V25M-74.94 23V25M-72.03 23V25M-69.12 23V25M-66.21 23V25M-63.3 23V25M-60.39 23V25M-57.48 23V25M-54.57 23V25M-51.66 23V25M-48.75 23V25M-42.93 23V25M-37.11 23V25M-45.84 23V25M-40.02 23V25M-34.2 23V25M-98.22 23V25M-95.31 23V25M-104.04 23V25M-101.13 23V25M-109.86 23V25M-106.95 23V25M-115.68 23V25M-112.77 23V25M-121.5 23V25M-118.59 23V25M-127.32 23V25M-133.14 23V25M-138.96 23V25M-144.78 23V25M-147.69 23V25M-141.87 23V25M-136.05 23V25M-130.23 23V25M-124.41 23V25M24 23V25M26.91 23V25M29.82 23V25M32.73 23V25M35.64 23V25M38.55 23V25M41.46 23V25M44.37 23V25M47.28 23V25M50.19 23V25M53.1 23V25M56.01 23V25M58.92 23V25M61.83 23V25M64.74 23V25M67.65 23V25M73.47 23V25M79.29 23V25M70.56 23V25M76.38 23V25M82.2 23V25M18.18 23V25M21.09 23V25M12.36 23V25M15.27 23V25M6.53998 23V25M9.44998 23V25M0.719974 23V25M3.62998 23V25M-5.10001 23V25M-2.19001 23V25M-10.92 23V25M-16.74 23V25M-22.56 23V25M-28.38 23V25M-31.29 23V25M-25.47 23V25M-19.65 23V25M-13.83 23V25M-8.01001 23V25M140.4 23V25M143.31 23V25M146.22 23V25M149.13 23V25M152.04 23V25M154.95 23V25M157.86 23V25M160.77 23V25M163.68 23V25M166.59 23V25M169.5 23V25M172.41 23V25M175.32 23V25M178.23 23V25M181.14 23V25M184.05 23V25M189.87 23V25M195.69 23V25M186.96 23V25M192.78 23V25M198.6 23V25M134.58 23V25M137.49 23V25M128.76 23V25M131.67 23V25M122.94 23V25M125.85 23V25M117.12 23V25M120.03 23V25M111.3 23V25M114.21 23V25M105.48 23V25M99.66 23V25M93.84 23V25M88.02 23V25M85.11 23V25M90.93 23V25M96.75 23V25M102.57 23V25M108.39 23V25M256.8 23V25M259.71 23V25M262.62 23V25M265.53 23V25M268.44 23V25M271.35 23V25M274.26 23V25M277.17 23V25M280.08 23V25M282.99 23V25M285.9 23V25M288.81 23V25M291.72 23V25M294.63 23V25M297.54 23V25M300.45 23V25M306.27 23V25M312.09 23V25M303.36 23V25M309.18 23V25M315 23V25M250.98 23V25M253.89 23V25M245.16 23V25M248.07 23V25M239.34 23V25M242.25 23V25M233.52 23V25M236.43 23V25M227.7 23V25M230.61 23V25M221.88 23V25M216.06 23V25M210.24 23V25M204.42 23V25M201.51 23V25M207.33 23V25M213.15 23V25M218.97 23V25M224.79 23V25"
            stroke="var(--instrument-frame-tertiary-color)"
          />
          <path
            d="M23 256.8H25M23 253.89H25M23 250.98H25M23 248.07H25M23 245.16H25M23 242.25H25M23 239.34H25M23 236.43H25M23 233.52H25M23 230.61H25M23 227.7H25M23 224.79H25M23 221.88H25M23 218.97H25M23 216.06H25M23 213.15H25M23 207.33H25M23 201.51H25M23 210.24H25M23 204.42H25M23 198.6H25M23 262.62H25M23 259.71H25M23 268.44H25M23 265.53H25M23 274.26H25M23 271.35H25M23 280.08H25M23 277.17H25M23 285.9H25M23 282.99H25M23 291.72H25M23 297.54H25M23 303.36H25M23 309.18H25M23 315H25M23 312.09H25M23 306.27H25M23 300.45H25M23 294.63H25M23 288.81H25M23 140.4H25M23 137.49H25M23 134.58H25M23 131.67H25M23 128.76H25M23 125.85H25M23 122.94H25M23 120.03H25M23 117.12H25M23 114.21H25M23 111.3H25M23 108.39H25M23 105.48H25M23 102.57H25M23 99.66H25M23 96.75H25M23 90.93H25M23 85.11H25M23 93.84H25M23 88.02H25M23 82.2H25M23 146.22H25M23 143.31H25M23 152.04H25M23 149.13H25M23 157.86H25M23 154.95H25M23 163.68H25M23 160.77H25M23 169.5H25M23 166.59H25M23 175.32H25M23 181.14H25M23 186.96H25M23 192.78H25M23 195.69H25M23 189.87H25M23 184.05H25M23 178.23H25M23 172.41H25M23 24H25M23 21.09H25M23 18.18H25M23 15.27H25M23 12.36H25M23 9.45001H25M23 6.54001H25M23 3.63001H25M23 0.720028H25M23 -2.18997H25M23 -5.09998H25M23 -8.00998H25M23 -10.92H25M23 -13.83H25M23 -16.74H25M23 -19.65H25M23 -25.47H25M23 -31.29H25M23 -22.56H25M23 -28.38H25M23 -34.2H25M23 29.82H25M23 26.91H25M23 35.64H25M23 32.73H25M23 41.46H25M23 38.55H25M23 47.28H25M23 44.37H25M23 53.1H25M23 50.19H25M23 58.92H25M23 64.74H25M23 70.56H25M23 76.38H25M23 79.29H25M23 73.47H25M23 67.65H25M23 61.83H25M23 56.01H25M23 -92.4H25M23 -95.31H25M23 -98.22H25M23 -101.13H25M23 -104.04H25M23 -106.95H25M23 -109.86H25M23 -112.77H25M23 -115.68H25M23 -118.59H25M23 -121.5H25M23 -124.41H25M23 -127.32H25M23 -130.23H25M23 -133.14H25M23 -136.05H25M23 -141.87H25M23 -147.69H25M23 -138.96H25M23 -144.78H25M23 -150.6H25M23 -86.58H25M23 -89.49H25M23 -80.76H25M23 -83.67H25M23 -74.94H25M23 -77.85H25M23 -69.12H25M23 -72.03H25M23 -63.3H25M23 -66.21H25M23 -57.48H25M23 -51.66H25M23 -45.84H25M23 -40.02H25M23 -37.11H25M23 -42.93H25M23 -48.75H25M23 -54.57H25M23 -60.39H25M23 -208.8H25M23 -211.71H25M23 -214.62H25M23 -217.53H25M23 -220.44H25M23 -223.35H25M23 -226.26H25M23 -229.17H25M23 -232.08H25M23 -234.99H25M23 -237.9H25M23 -240.81H25M23 -243.72H25M23 -246.63H25M23 -249.54H25M23 -252.45H25M23 -258.27H25M23 -264.09H25M23 -255.36H25M23 -261.18H25M23 -267H25M23 -202.98H25M23 -205.89H25M23 -197.16H25M23 -200.07H25M23 -191.34H25M23 -194.25H25M23 -185.52H25M23 -188.43H25M23 -179.7H25M23 -182.61H25M23 -173.88H25M23 -168.06H25M23 -162.24H25M23 -156.42H25M23 -153.51H25M23 -159.33H25M23 -165.15H25M23 -170.97H25M23 -176.79H25"
            stroke="var(--instrument-frame-tertiary-color)"
          />
        </g>
        <path
          d="M27 24H31"
          stroke="var(--element-neutral-color)"
          stroke-width="2"
          stroke-linecap="round"
        />
        <path
          d="M24 21L24 17"
          stroke="var(--element-neutral-color)"
          stroke-width="2"
          stroke-linecap="round"
        />
        <path
          d="M21 24L17 24"
          stroke="var(--element-neutral-color)"
          stroke-width="2"
          stroke-linecap="round"
        />
        <path
          d="M24 27L24 31"
          stroke="var(--element-neutral-color)"
          stroke-width="2"
          stroke-linecap="round"
        />
        <circle
          cx="24"
          cy="24"
          r="3"
          fill="var(--instrument-frame-primary-color)"
          stroke="var(--element-neutral-color)"
          stroke-width="2"
        />
      </svg>

      <div class="position field">
        <div class="row">
          <div class="value font-instrument-value-regular">{{ north }}</div>
          <div class="unit font-instrument-label">N</div>
        </div>
        <div class="row">
          <div class="value font-instrument-value-regular">{{ east }}</div>
          <div class="unit font-instrument-label">E</div>
        </div>
        <div class="divider-position"></div>
        <div class="src">GPS1</div>
      </div>
    </div>
  </ObcCard>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useSim } from '@/composables/useSim'
import ObcCard from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/card/ObcCard.vue'
import ObcInstrumentField from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/navigation-instruments/instrument-field/ObcInstrumentField.vue'
import { InstrumentFieldSize } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/instrument-field/instrument-field'
import { CompassIndicatorArrow } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/compass-indicator/compass-indicator'
import ObcCompassIndicator from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/navigation-instruments/compass-indicator/ObcCompassIndicator.vue'
import ObcRotIndicator from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/navigation-instruments/rot-indicator/ObcRotIndicator.vue'
import ObcSpeedIndicator from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/navigation-instruments/speed-indicator/ObcSpeedIndicator.vue'
import ObcGraphMini from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/navigation-instruments/graph-mini/ObcGraphMini.vue'
import ObcNavigationItem from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/navigation-item/ObcNavigationItem.vue'

const sim = useSim()
const headingSrc = ref('GYR1')
const courseOverGroundSrc = ref('GPS1')
const rotationSrc = ref('GYR1')
const speedSrc = ref('GYR1')
const depthSrc = ref('ECH1')

function mapTo360Degrees(value: number) {
  return ((value % 360) + 360) % 360
}

// Take degrees and return dd* mm.mmm'
function formatDegrees(value: number) {
  const degrees = Math.floor(value)
  const minutes = ((value - degrees) * 60).toFixed(3)
  return `${degrees}° ${minutes}'`
}

const north = computed(() => {
  const n = sim.north.value
  return formatDegrees(n)
})

const east = computed(() => {
  const e = sim.east.value
  return formatDegrees(e)
})

const depthDataLast30 = computed(() => {
  const [xData, yData] = sim.depthData.value
  const last30X = xData.slice(-30)
  const last30Y = yData.slice(-30).map((y) => -y)
  return [last30X, last30Y] as [number[], number[]]
})
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
  box-sizing: border-box;
  display: grid;
  grid-template-columns: min-content 1fr;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  --obc-instrument-field-source-width: 70px;
  --obc-instrument-field-tag-width: 50px;
}

.field {
  grid-column: 2 / 3;
  justify-self: end;
}

.indicator {
  grid-column: 1 / 2;
}

.value {
  white-space: nowrap;
  color: var(--element-neutral-color);
}

.unit {
  color: var(--instrument-regular-secondary-color);
  width: 16px;
}

.position {
  display: grid;
  width: fit-content;
  grid-column: 2 / -1;
  justify-self: end;
  grid-template-columns: 1fr min-content min-content;
  grid-template-rows: 1fr 1fr;

  .row {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-self: end;
    justify-content: end;
    width: fit-content;
    grid-column: 1 / 2;
    gap: 4px;
  }

  .divider-position {
    height: var(--instrument-components-readout-divider-height-regular);
    width: 1px;
    background-color: var(--border-outline-color);
    border-radius: 1px;
    margin-right: calc(var(--instrument-components-readout-padding-horizontal) * 2 - 1px);
    grid-column: 2 / 3;
    grid-row: 1 / -1;
    align-self: center;
  }

  .src {
    grid-column: 3 / 4;
    grid-row: 1 / -1;
    align-self: center;
    width: var(--obc-instrument-field-source-width);
    color: var(--element-neutral-color);
    font-feature-settings:
      'liga' off,
      'clig' off;
    font-family: var(--font-family-main);
    font-size: var(--global-typography-ui-body-font-size);
    font-style: normal;
    font-weight: var(--global-typography-ui-body-font-weight);
    line-height: var(--global-typography-ui-body-line-height) /* 150% */;
  }
}
</style>
