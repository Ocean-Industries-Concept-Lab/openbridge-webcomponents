<template>
  <div class="map-container">
    <div class="side-panel">
      <OwnShipDataCard class="own-ship-data-card" />
      <ObcCard class="targets-card">
        <div slot="title">Targets</div>
        <TargetsList :vessels="aisTargetsInView" />
      </ObcCard>
    </div>
    <div ref="map" class="map"></div>

    <div class="toolbar">
      <ObcStepperBox @up="zoomIn" @down="zoomOut">
        <div>{{ scale }}</div>
        <div slot="unit">NM</div>
      </ObcStepperBox>
      <ObcToggleButtonGroup value="N" class="direction-button-group">
        <ObcToggleButtonOption value="H" :type="ObcToggleButtonOptionType.icon">
          <obi-heading-h-up-proposal slot="icon"></obi-heading-h-up-proposal>
        </ObcToggleButtonOption>
        <ObcToggleButtonOption value="N" :type="ObcToggleButtonOptionType.icon">
          <obi-heading-n-up-proposal slot="icon"></obi-heading-n-up-proposal>
        </ObcToggleButtonOption>
        <ObcToggleButtonOption value="C" :type="ObcToggleButtonOptionType.icon">
          <obi-heading-c-up-proposal slot="icon"></obi-heading-c-up-proposal>
        </ObcToggleButtonOption>
      </ObcToggleButtonGroup>
      <ObcToggleButtonGroup
        value="follow"
        class="follow-button-group"
        @value="onFollowButtonGroupValueChange"
      >
        <ObcToggleButtonOption value="follow" :type="ObcToggleButtonOptionType.icon">
          <obi-cent-iec slot="icon" usecsscolors></obi-cent-iec>
        </ObcToggleButtonOption>
        <ObcToggleButtonOption value="N" :type="ObcToggleButtonOptionType.icon">
          <svg
            slot="icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.8506 12.4062C17.4207 10.8362 19.6451 10.3174 21.6465 10.8516L21.6475 10.8525C22.182 12.8542 21.6641 15.079 20.0938 16.6494L14.5254 22.2178L10.2822 17.9746L15.8506 12.4062ZM19.8428 12.6562C18.9025 12.7148 17.9811 13.1039 17.2646 13.8203L13.1104 17.9746L14.5244 19.3887L18.6787 15.2354C19.3954 14.5187 19.7844 13.5968 19.8428 12.6562ZM9 14H7V10H9V14ZM6 9H2V7H6V9ZM14 9H10V7H14V9ZM9 2V6H7V2H9Z"
              fill="currentColor"
            />
          </svg>
        </ObcToggleButtonOption>
      </ObcToggleButtonGroup>
    </div>
  </div>
</template>

<script lang="ts" setup>
// Required dependencies: npm install proj4 proj4leaflet
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { getNavtorToken } from '@/business/getNavtorToken'
import { useSim } from '@/composables/useSim'
import OwnShipDataCard from '@/components/OwnShipDataCard.vue'
import TargetsList from '@/components/TargetsList.vue'
import ObcCard from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/card/ObcCard.vue'
import ObcStepperBox from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/stepper-box/ObcStepperBox.vue'
import ObcToggleButtonGroup from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/toggle-button-group/ObcToggleButtonGroup.vue'
import type { ObcToggleButtonGroupValueChangeEvent } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/toggle-button-group/toggle-button-group.js'
import ObcToggleButtonOption from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/toggle-button-option/ObcToggleButtonOption.vue'
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heading-h-up-proposal'
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heading-n-up-proposal'
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heading-c-up-proposal'
import { getAisStream, getVesselImage, type AisData } from '@/business/aisData'
import { ObcToggleButtonOptionType } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/toggle-button-option/toggle-button-option.js'

let navtortoken = ''
const shouldCenter = ref(true)

const map = ref<HTMLDivElement | null>(null)
let leafletMap: L.Map | null = null
let lastMapTimestamp: number = 0
const zoom = ref(12)
const scale = computed(() => {
  return Math.pow(2, 14 - zoom.value)
})

const sim = useSim()
let pointerMarker: L.Marker | null = null
let headingLine: L.Polyline | null = null
let transverseLine: L.Polyline | null = null
const vesselMarkers: Map<number, L.Marker> = new Map()
const aisVessels = ref<Map<number, AisData>>(new Map())
let aisStreamReader: ReadableStreamDefaultReader<AisData> | null = null

// Reactive trigger for map bounds changes
const mapBoundsUpdateTrigger = ref(0)

// Computed variable for AIS targets inside map bbox
const aisTargetsInView = computed(() => {
  // Include the trigger to make this reactive to bounds changes
  void mapBoundsUpdateTrigger.value

  if (!leafletMap) return new Map<number, AisData>()

  const bounds = leafletMap.getBounds()
  const targetsInView = new Map<number, AisData>()

  aisVessels.value.forEach((vessel, mmsi) => {
    if (typeof vessel.latitude === 'number' && typeof vessel.longitude === 'number') {
      const latLng = L.latLng(vessel.latitude, vessel.longitude)
      if (bounds.contains(latLng)) {
        targetsInView.set(mmsi, vessel)
      }
    }
  })

  return targetsInView
})

function getHeadingEndpoint(lat: number, lng: number, headingDeg: number, distanceMeters: number) {
  // Earth radius in meters
  const R = 6378137
  const headingRad = (headingDeg * Math.PI) / 180
  const latRad = (lat * Math.PI) / 180
  const lngRad = (lng * Math.PI) / 180
  const newLatRad = Math.asin(
    Math.sin(latRad) * Math.cos(distanceMeters / R) +
      Math.cos(latRad) * Math.sin(distanceMeters / R) * Math.cos(headingRad)
  )
  const newLngRad =
    lngRad +
    Math.atan2(
      Math.sin(headingRad) * Math.sin(distanceMeters / R) * Math.cos(latRad),
      Math.cos(distanceMeters / R) - Math.sin(latRad) * Math.sin(newLatRad)
    )
  return [(newLatRad * 180) / Math.PI, (newLngRad * 180) / Math.PI]
}

onMounted(async () => {
  navtortoken = await getNavtorToken()
  lastMapTimestamp = Date.now()

  if (map.value) {
    leafletMap = L.map(map.value, {
      center: [sim.north.value, sim.east.value],
      zoom: zoom.value,
      crs: L.CRS.EPSG3857,
      attributionControl: false,
      zoomControl: false
    })
    leafletMap.keyboard.disable()
    leafletMap.dragging.disable()
    leafletMap.on('zoomend', () => {
      if (leafletMap) {
        zoom.value = leafletMap.getZoom()
        mapBoundsUpdateTrigger.value++
      }
    })

    // Listen for map bounds changes (pan, zoom, etc.)
    leafletMap.on('moveend', () => {
      mapBoundsUpdateTrigger.value++
    })

    const tileLayer = L.tileLayer(
      'https://api.navtor.com/tile/v1/map/tiles/Enc/{z}/{x}/{y}.png?bearerToken={token}',
      {
        tileSize: 256,
        maxZoom: 16,
        minZoom: 0,
        // @ts-expect-error 2353
        token: navtortoken
      }
    )
    tileLayer.addTo(leafletMap)
    tileLayer.on('tileload', () => {
      checkIfTokenNeedsRefresh()
    })

    // Add a pointer marker at the center
    pointerMarker = L.marker([sim.north.value, sim.east.value], {
      icon: L.icon({
        iconUrl: '/own-ship-simplified-iec.png',
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      })
    }).addTo(leafletMap)

    startAisStream()
  }
})

// Draw heading line
function updateHeadingLine() {
  if (!leafletMap) return
  const start: [number, number] = [sim.north.value, sim.east.value]
  const heading = sim.vessel.headingDeg.value
  const distance = ((sim.vessel.speedForwardThroughWaterKnots.value * 1852) / 60) * 5
  const end: [number, number] = getHeadingEndpoint(
    sim.north.value,
    sim.east.value,
    heading,
    distance
  ) as [number, number]
  if (headingLine) {
    headingLine.setLatLngs([start, end])
  } else {
    headingLine = L.polyline([start, end], { color: 'black', weight: 1 }).addTo(leafletMap)
  }
}

function updateTransverseLine() {
  if (!leafletMap) return
  const heading = sim.vessel.headingDeg.value
  const distance = scale.value * 70
  const end: [number, number] = getHeadingEndpoint(
    sim.north.value,
    sim.east.value,
    heading + 90,
    distance
  ) as [number, number]
  const start: [number, number] = getHeadingEndpoint(
    sim.north.value,
    sim.east.value,
    heading - 90,
    distance
  ) as [number, number]
  if (transverseLine) {
    transverseLine.setLatLngs([start, end])
  } else {
    transverseLine = L.polyline([start, end], { color: 'black', weight: 1 }).addTo(leafletMap)
  }
}

// Watch for changes in sim.north, sim.east, or heading to update marker, recenter map, and update heading line
watch(
  [() => sim.north.value, () => sim.east.value, () => sim.vessel.headingDeg.value],
  ([newNorth, newEast]) => {
    if (pointerMarker) {
      pointerMarker.setLatLng([newNorth, newEast])
    }
    if (leafletMap && shouldCenter.value) {
      leafletMap.setView([newNorth, newEast], leafletMap.getZoom())
    }
    updateHeadingLine()
    updateTransverseLine()
  },
  { immediate: true }
)

// Watch shouldCenter to enable/disable map interactions
watch(
  shouldCenter,
  (val) => {
    if (!leafletMap) return
    if (val) {
      leafletMap.dragging.disable()
    } else {
      leafletMap.dragging.enable()
    }
  },
  { immediate: true }
)

function zoomIn() {
  if (leafletMap) {
    leafletMap.zoomIn()
  }
}

function zoomOut() {
  if (leafletMap) {
    leafletMap.zoomOut()
  }
}

async function checkIfTokenNeedsRefresh() {
  const currentTimestamp = Date.now()
  if (currentTimestamp - lastMapTimestamp > 1_000 * 60 * 5) {
    lastMapTimestamp = currentTimestamp
    navtortoken = await getNavtorToken()
  }
  lastMapTimestamp = currentTimestamp
}

onBeforeUnmount(() => {
  if (leafletMap) {
    leafletMap.remove()
    leafletMap = null
  }
  if (pointerMarker) {
    pointerMarker.remove()
    pointerMarker = null
  }
  if (headingLine) {
    headingLine.remove()
    headingLine = null
  }
  // Cancel AIS stream
  if (aisStreamReader) {
    try {
      aisStreamReader.cancel()
    } catch {
      /* ignore */
    }
    aisStreamReader = null
  }
})

function onFollowButtonGroupValueChange(event: ObcToggleButtonGroupValueChangeEvent) {
  shouldCenter.value = event.detail.value === 'follow'
}

//@ts-expect-error: TS2239
const proto_initIcon = L.Marker.prototype._initIcon
//@ts-expect-error: TS2239
const proto_setPos = L.Marker.prototype._setPos

L.Marker.include({
  _initIcon: function () {
    proto_initIcon.call(this)
  },

  _setPos: function (pos: [number, number]) {
    proto_setPos.call(this, pos)
    this._applyRotation()
  },

  _applyRotation: function () {
    if (this.options.rotationAngle) {
      this._icon.style[L.DomUtil.TRANSFORM + 'Origin'] = this.options.rotationOrigin || '14px 14px'
      this._icon.style[L.DomUtil.TRANSFORM] += ' rotateZ(' + this.options.rotationAngle + 'deg)'
    }
  },

  setRotationAngle: function (angle: number) {
    this.options.rotationAngle = angle
    this.update()
    return this
  },

  setRotationOrigin: function (origin: string) {
    this.options.rotationOrigin = origin
    this.update()
    return this
  }
})

const useVesselImage = ref(true)

async function startAisStream() {
  const stream = await getAisStream()
  const reader = stream.getReader()
  aisStreamReader = reader
  while (true) {
    const { done, value } = await reader.read()
    if (done) {
      break
    }
    // Only render if mmsi is present
    if (!value.mmsi) continue
    // Only render if lat/lon are valid
    if (typeof value.latitude !== 'number' || typeof value.longitude !== 'number') continue

    aisVessels.value.set(value.mmsi, value)
    if (!leafletMap) continue
    let marker = vesselMarkers.get(value.mmsi)
    const latlng: [number, number] = [value.latitude, value.longitude]
    if (marker) {
      marker.setLatLng(latlng)
      const rotation = value.trueHeading || value.courseOverGround || 0
      //@ts-expect-error: TS2239
      marker.setRotationAngle(rotation)
    } else {
      const iconUrl = useVesselImage.value
        ? getVesselImage(value.shipType)
        : '/ais-target-activated-iec.png'
      marker = L.marker(latlng, {
        icon: L.icon({
          iconUrl: iconUrl,
          iconSize: [24, 24],
          iconAnchor: [14, 14]
        })
      }).addTo(leafletMap)
      marker.bindTooltip(`${value.name || 'Vessel'} (${value.mmsi})`)
      vesselMarkers.set(value.mmsi, marker)
      const rotation = value.trueHeading || value.courseOverGround || 0
      //@ts-expect-error: TS2239
      marker.setRotationAngle(rotation)
    }
  }
}
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
    'side-panel map'
    'side-panel toolbar';
  top: 48px;
  width: 100%;
  height: calc(100vh - 48px);
  isolation: isolate;
}

.map {
  position: relative;
  width: 100%;
  height: 100%;
  grid-area: map;
  z-index: 1;
}

.side-panel {
  width: 320px;
  height: 100%;
  max-height: 100%;
  background: var(--container-backdrop-color);
  border-right: 1px solid var(--border-outline-color);
  grid-area: side-panel;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 4px;
  z-index: 2;
}

.own-ship-data-card {
  flex-basis: fit-content;
  flex-grow: 0;
  flex-shrink: 0;
}

.targets-card {
  flex: 1;
  overflow: hidden;
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
  box-shadow: var(--shadow-flat-x) var(--shadow-flat-y) var(--shadow-flat-blur)
    var(--shadow-flat-spread) var(--shadow-flat-color);
}

.direction-button-group {
  min-width: 144px;
}

.follow-button-group {
  min-width: 96px;
}

.leaflet-pane {
  z-index: 0 !important;
}

.side-panel-card {
  width: 100%;
  padding: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
