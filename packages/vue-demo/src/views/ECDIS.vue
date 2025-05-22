<template>
    <div class="map-container">
        <div class="side-panel">
        </div>
        <div ref="map" class="map">
        </div>
        <div class="toolbar">
            <button @click="zoomIn">Zoom In</button>
            <button @click="zoomOut">Zoom Out</button>
            {{ scale }}
        </div>
    </div>

</template>

<script lang="ts" setup>
// Required dependencies: npm install proj4 proj4leaflet
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getNavtorToken } from '@/business/getNavtorToken';

let navtortoken = '';

const map = ref<HTMLDivElement | null>(null);
let leafletMap: L.Map | null = null;
let lastMapTimestamp: number = 0;
const zoom = ref(14);
const scale = computed(() => {
    return Math.pow(2, 14 - zoom.value);
});

onMounted( async () => {

    navtortoken = await getNavtorToken();
    lastMapTimestamp = Date.now();

  if (map.value) {

    leafletMap = L.map(map.value, {
      center: [62.4629779, 6.1703746],
      zoom: 14,
      crs: L.CRS.EPSG3857,
      attributionControl: false,
      zoomControl: false,
    });
    leafletMap.on('zoomend', () => {
        if (leafletMap) {
            zoom.value = leafletMap.getZoom()
        }
    });

    const tileLayer = L.tileLayer(
      'https://api.navtor.com/tile/v1/map/tiles/Enc/{z}/{x}/{y}.png?bearerToken={token}',
      {
        tileSize: 256,
        maxZoom: 14,
        minZoom: 0,
        // @ts-expect-error 2353
        token: navtortoken,
      }
    )
    tileLayer.addTo(leafletMap);
    tileLayer.on('tileload', () => {
        checkIfTokenNeedsRefresh();
    });
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
}
.map {
    width: 100%;
    height: 100%;
    grid-area: map;
}
.side-panel {
    width:  320px;
    height: 100%;
    background-color: var(--container-background-color);
    border-right: 1px solid var(--border-outline-color);
    grid-area: side-panel;
}
.toolbar {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    grid-area: toolbar;
    height: var(--app-components-tool-bar-touch-target-size);
    padding: 0px var(--app-components-tool-bar-margin-global);
    border-top: 1px solid var(--border-divider-color);
    background: var(--container-section-color);
    box-shadow: var(--shadow-flat-x) var(--shadow-flat-y) var(--shadow-flat-blur) var(--shadow-flat-spread) var(--shadow-flat-color);
}
</style>