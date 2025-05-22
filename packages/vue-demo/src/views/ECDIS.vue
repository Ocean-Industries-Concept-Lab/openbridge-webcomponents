<template>
    <div class="map-container">
        <div class="side-panel">
            <ObcCard >
                <div slot="title">Own ship data</div>
                <div class="side-panel-card">
                    <ObcInstrumentField :value="mapTo360Degrees(sim.vessel.headingDeg.value)" :size="InstrumentFieldSize.enhanced" unit="DEG" tag="HDG" horizontal />
                    <ObcInstrumentField :value="mapTo360Degrees(sim.vessel.courseOverGroundDeg.value)" :size="InstrumentFieldSize.enhanced" unit="DEG" tag="COG" horizontal />
                    <ObcInstrumentField :value="sim.vessel.rotationDegPerMinute.value" :size="InstrumentFieldSize.enhanced" unit="DEG/min" tag="ROT" horizontal />
                    <div class="divider"></div>
                    
                    <ObcInstrumentField :value="sim.vessel.speedForwardThroughWaterKnots.value" :size="InstrumentFieldSize.enhanced" unit="KN" tag="STW" horizontal />
                    <ObcInstrumentField :value="sim.depth.value" :size="InstrumentFieldSize.enhanced" unit="m" tag="Depth" horizontal />
                    
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
            </ObcCard>
        </div>
        <div ref="map" class="map"></div>
        
        <div class="toolbar">
            <ObcStepperBox @up="zoomIn" @down="zoomOut">
                <div>{{ scale }}</div>
                <div slot="unit">NM</div>
            </ObcStepperBox>
            <ObcToggleButtonGroup value="N" class="direction-button-group">
                <ObcToggleButtonOption value="H">
                <obi-heading-h-up-proposal slot="icon"></obi-heading-h-up-proposal>
                </ObcToggleButtonOption>
                <ObcToggleButtonOption value="N">
                    <obi-heading-n-up-proposal slot="icon"></obi-heading-n-up-proposal>
                </ObcToggleButtonOption>
                <ObcToggleButtonOption value="C">
                    <obi-heading-c-up-proposal slot="icon"></obi-heading-c-up-proposal>
                </ObcToggleButtonOption>
            </ObcToggleButtonGroup>
            <ObcToggleButtonGroup value="follow" class="follow-button-group" @value="onFollowButtonGroupValueChange">
                <ObcToggleButtonOption value="follow">
                    <obi-cent-iec slot="icon" usecsscolors></obi-cent-iec>
                </ObcToggleButtonOption>
                <ObcToggleButtonOption value="N">
                    <svg slot="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.8506 12.4062C17.4207 10.8362 19.6451 10.3174 21.6465 10.8516L21.6475 10.8525C22.182 12.8542 21.6641 15.079 20.0938 16.6494L14.5254 22.2178L10.2822 17.9746L15.8506 12.4062ZM19.8428 12.6562C18.9025 12.7148 17.9811 13.1039 17.2646 13.8203L13.1104 17.9746L14.5244 19.3887L18.6787 15.2354C19.3954 14.5187 19.7844 13.5968 19.8428 12.6562ZM9 14H7V10H9V14ZM6 9H2V7H6V9ZM14 9H10V7H14V9ZM9 2V6H7V2H9Z" fill="currentColor"/>
                    </svg>
                </ObcToggleButtonOption>
            </ObcToggleButtonGroup>
        </div>
    </div>

</template>

<script lang="ts" setup>
// Required dependencies: npm install proj4 proj4leaflet
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getNavtorToken } from '@/business/getNavtorToken';
import { useSim } from '@/composables/useSim';
import ObcCard from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/card/ObcCard.vue';
import ObcInstrumentField from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/navigation-instruments/instrument-field/ObcInstrumentField.vue';
import { InstrumentFieldSize } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/instrument-field/instrument-field';
import ObcStepperBox from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/stepper-box/ObcStepperBox.vue';
import ObcToggleButtonGroup, { type ObcToggleButtonGroupValueChangeEvent } from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/toggle-button-group/ObcToggleButtonGroup.vue';
import ObcToggleButtonOption from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/toggle-button-option/ObcToggleButtonOption.vue';
import "@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heading-h-up-proposal"
import "@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heading-n-up-proposal"
import "@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heading-c-up-proposal"

let navtortoken = '';
const shouldCenter = ref(true);

const map = ref<HTMLDivElement | null>(null);
let leafletMap: L.Map | null = null;
let lastMapTimestamp: number = 0;
const zoom = ref(14);
const scale = computed(() => {
    return Math.pow(2, 14 - zoom.value);
});

const sim = useSim();
let pointerMarker: L.Marker | null = null;
let headingLine: L.Polyline | null = null;
let transverseLine: L.Polyline | null = null;

function mapTo360Degrees(value: number) {
    return (value % 360 + 360) % 360;
}

function getHeadingEndpoint(lat: number, lng: number, headingDeg: number, distanceMeters: number) {
    // Earth radius in meters
    const R = 6378137;
    const headingRad = headingDeg * Math.PI / 180;
    const latRad = lat * Math.PI / 180;
    const lngRad = lng * Math.PI / 180;
    const newLatRad = Math.asin(Math.sin(latRad) * Math.cos(distanceMeters / R) + Math.cos(latRad) * Math.sin(distanceMeters / R) * Math.cos(headingRad));
    const newLngRad = lngRad + Math.atan2(
        Math.sin(headingRad) * Math.sin(distanceMeters / R) * Math.cos(latRad),
        Math.cos(distanceMeters / R) - Math.sin(latRad) * Math.sin(newLatRad)
    );
    return [newLatRad * 180 / Math.PI, newLngRad * 180 / Math.PI];
}

onMounted( async () => {

    navtortoken = await getNavtorToken();
    lastMapTimestamp = Date.now();

  if (map.value) {

    leafletMap = L.map(map.value, {
      center: [sim.north.value, sim.east.value],
      zoom: 14,
      crs: L.CRS.EPSG3857,
      attributionControl: false,
      zoomControl: false,
    });
    leafletMap.keyboard.disable();
    leafletMap.on('zoomend', () => {
        if (leafletMap) {
            zoom.value = leafletMap.getZoom()
        }
    });

    const tileLayer = L.tileLayer(
      'https://api.navtor.com/tile/v1/map/tiles/Enc/{z}/{x}/{y}.png?bearerToken={token}',
      {
        tileSize: 256,
        maxZoom: 16,
        minZoom: 0,
        // @ts-expect-error 2353
        token: navtortoken,
      }
    )
    tileLayer.addTo(leafletMap);
    tileLayer.on('tileload', () => {
        checkIfTokenNeedsRefresh();
    });

    // Add a pointer marker at the center
    pointerMarker = L.marker([sim.north.value, sim.east.value], {
      icon: L.icon({
        iconUrl: '/own-ship-simplified-iec.png',
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      })
    }).addTo(leafletMap);

    // Draw heading line
    function updateHeadingLine() {
      if (!leafletMap) return;
      const start: [number, number] = [sim.north.value, sim.east.value];
      const heading = sim.vessel.headingDeg.value;
      const distance = sim.vessel.speedForwardThroughWaterKnots.value * 1852 / 60;
      const end: [number, number] = getHeadingEndpoint(sim.north.value, sim.east.value, heading, distance) as [number, number];
      if (headingLine) {
        headingLine.setLatLngs([start, end]);
      } else {
        headingLine = L.polyline([start, end], { color: 'black', weight: 1 }).addTo(leafletMap);
      }
    }

    function updateTransverseLine() {
      if (!leafletMap) return;
      const heading = sim.vessel.headingDeg.value;
      const distance = scale.value * 70;
      const end: [number, number] = getHeadingEndpoint(sim.north.value, sim.east.value, heading + 90, distance) as [number, number];
      const start: [number, number] = getHeadingEndpoint(sim.north.value, sim.east.value, heading - 90, distance) as [number, number];
      if (transverseLine) {
        transverseLine.setLatLngs([start, end]);
      } else {
        transverseLine = L.polyline([start, end], { color: 'black', weight: 1 }).addTo(leafletMap);
      }
    }

    // Watch for changes in sim.north, sim.east, or heading to update marker, recenter map, and update heading line
    watch([
      () => sim.north.value,
      () => sim.east.value,
      () => sim.vessel.headingDeg.value
    ], ([newNorth, newEast]) => {
      if (pointerMarker) {
        pointerMarker.setLatLng([newNorth, newEast]);
      }
      if (leafletMap && shouldCenter.value) {
        leafletMap.setView([newNorth, newEast], leafletMap.getZoom());
      }
      updateHeadingLine();
      updateTransverseLine();
    }, { immediate: true });

    // Watch shouldCenter to enable/disable map interactions
    watch(shouldCenter, (val) => {
      if (!leafletMap) return;
      if (val) {
        leafletMap.dragging.disable();
      } else {
        leafletMap.dragging.enable();
      }
    }, { immediate: true });
  }
});

function zoomIn() {
    if (leafletMap) {
        leafletMap.zoomIn();
    }
}

function zoomOut() {
    if (leafletMap) {
        leafletMap.zoomOut();
    }
}   



async function checkIfTokenNeedsRefresh() {
    const currentTimestamp = Date.now();
    if (currentTimestamp - lastMapTimestamp > 1_000*60*5) {
        lastMapTimestamp = currentTimestamp;
        navtortoken = await getNavtorToken();
    }
    lastMapTimestamp = currentTimestamp;
}

onBeforeUnmount(() => {
  if (leafletMap) {
    leafletMap.remove();
    leafletMap = null;
  }
  if (pointerMarker) {
    pointerMarker.remove();
    pointerMarker = null;
  }
  if (headingLine) {
    headingLine.remove();
    headingLine = null;
  }
});

function onFollowButtonGroupValueChange(event: ObcToggleButtonGroupValueChangeEvent) {
    shouldCenter.value = event.detail.value === 'follow';
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

</script>

<style scoped>
* {
    box-sizing: border-box;
}

.map-container {
    display: grid;
    grid-template-columns: min-content 1fr;
    grid-template-rows: 1fr min-content;
    grid-template-areas:
        "side-panel map"
        "side-panel toolbar";
    top: 48px;
    width: 100%;
    height: calc(100vh - 48px);
    isolation: isolates;
}
.map {
    position: relative;
    width: 100%;
    height: 100%;
    grid-area: map;
}

.side-panel {
    width:  320px;
    height: 100%;
    background: var(--container-backdrop-color);
    border-right: 1px solid var(--border-outline-color);
    grid-area: side-panel;
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 4px;
}
.toolbar {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    grid-area: toolbar;
    height: var(--app-components-tool-bar-touch-target-size);
    padding: 0px var(--app-components-tool-bar-margin-global);
    gap: 12px;
    border-top: 1px solid var(--border-divider-color);
    background: var(--container-section-color);
    box-shadow: var(--shadow-flat-x) var(--shadow-flat-y) var(--shadow-flat-blur) var(--shadow-flat-spread) var(--shadow-flat-color);
}
.direction-button-group {
    min-width: 144px;
}

.follow-button-group {
    min-width: 96px;
}

.divider {
    height: 1px;
    width: 100%;
    margin: 8px 0px;
    background: var(--border-outline-color);
}

.side-panel-card {
    width: 100%;
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px
}

obc-instrument-field::part(label) {
    width: 7ch;
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