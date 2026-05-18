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
        <div>{{ scale.toFixed(2) }}</div>
        <div slot="unit">NM</div>
      </ObcStepperBox>
      <ObcToggleButtonGroup
        :value="mapDirection"
        class="direction-button-group"
        @value="onMapDirectionValueChange"
      >
        <ObcToggleButtonOption value="H" :type="ObcToggleButtonOptionType.icon">
          <obi-heading-h-up-proposal></obi-heading-h-up-proposal>
        </ObcToggleButtonOption>
        <ObcToggleButtonOption value="N" :type="ObcToggleButtonOptionType.icon">
          <obi-heading-n-up-proposal></obi-heading-n-up-proposal>
        </ObcToggleButtonOption>
        <ObcToggleButtonOption value="C" :type="ObcToggleButtonOptionType.icon">
          <obi-heading-c-up-proposal></obi-heading-c-up-proposal>
        </ObcToggleButtonOption>
      </ObcToggleButtonGroup>
      <ObcToggleButtonGroup
        :value="shouldCenter ? 'follow' : 'N'"
        class="follow-button-group"
        @value="onFollowButtonGroupValueChange"
      >
        <ObcToggleButtonOption value="follow" :type="ObcToggleButtonOptionType.icon">
          <obi-center-iec usecsscolors></obi-center-iec>
        </ObcToggleButtonOption>
        <ObcToggleButtonOption value="N" :type="ObcToggleButtonOptionType.icon">
          <svg
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
import { useSim, type Sim } from '@/composables/useSim'
import OwnShipDataCard from '@/components/OwnShipDataCard.vue'
import TargetsList from '@/components/TargetsList.vue'
import ObcCard from '@oicl/openbridge-webcomponents-vue/components/card/ObcCard.vue'
import ObcStepperBox from '@oicl/openbridge-webcomponents-vue/components/stepper-box/ObcStepperBox.vue'
import ObcToggleButtonGroup from '@oicl/openbridge-webcomponents-vue/components/toggle-button-group/ObcToggleButtonGroup.vue'
import type { ObcToggleButtonGroupValueChangeEvent } from '@oicl/openbridge-webcomponents/dist/components/toggle-button-group/toggle-button-group.js'
import ObcToggleButtonOption from '@oicl/openbridge-webcomponents-vue/components/toggle-button-option/ObcToggleButtonOption.vue'
import '@oicl/openbridge-webcomponents/dist/icons/icon-heading-h-up-proposal'
import '@oicl/openbridge-webcomponents/dist/icons/icon-heading-n-up-proposal'
import '@oicl/openbridge-webcomponents/dist/icons/icon-heading-c-up-proposal'
import '@oicl/openbridge-webcomponents/dist/icons/icon-center-iec'
import '@oicl/openbridge-webcomponents/dist/icons/icon-center-off-iec'
import { getAisStream, getVesselImage, vesselImages, type AisData } from '@/business/aisData'
import { ObcToggleButtonOptionType } from '@oicl/openbridge-webcomponents/dist/components/toggle-button-option/toggle-button-option.js'
import maplibregl, {
  type MapOptions,
  Map as MaplibreglMap,
  GeoJSONSource,
  LngLat
} from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { Protocol, PMTiles } from 'pmtiles'

const shouldCenter = ref(true)

const map = ref<HTMLDivElement | null>(null)
let maplibreglMap: MaplibreglMap | null = null
const zoom = ref(12)
const scale = computed(() => {
  return Math.pow(2, 14 - zoom.value)
})

const mapDirection = ref<'N' | 'H' | 'C'>('N')

function onMapDirectionValueChange(event: ObcToggleButtonGroupValueChangeEvent) {
  mapDirection.value = event.detail.value as 'N' | 'H' | 'C'
}

const sim = useSim()
const ownShipSource = computed((): GeoJSON.FeatureCollection => {
  return {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [sim.east.value, sim.north.value]
        },
        properties: { heading: sim.vessel.headingDeg.value }
      }
    ]
  }
})

const aisVessels = ref<Map<number, AisData>>(new Map())
let aisStreamReader: ReadableStreamDefaultReader<AisData> | null = null

// Computed variable for AIS targets inside map bbox
function updateAisTargetsInView() {
  if (!maplibreglMap) return

  const bounds = maplibreglMap.getBounds()
  const targetsInView = new Map<number, AisData>()

  aisVessels.value.forEach((vessel, mmsi) => {
    if (typeof vessel.latitude === 'number' && typeof vessel.longitude === 'number') {
      const lngLat = new LngLat(vessel.longitude, vessel.latitude)
      if (bounds.contains(lngLat)) {
        targetsInView.set(mmsi, vessel)
      }
    }
  })

  aisTargetsInView.value = targetsInView
}

const aisTargetsInView = ref<Map<number, AisData>>(new Map())

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
  return [(newLngRad * 180) / Math.PI, (newLatRad * 180) / Math.PI]
}

onMounted(async () => {
  if (map.value) {
    // add the PMTiles plugin to the maplibregl global.
    const protocol = new Protocol()
    maplibregl.addProtocol('pmtiles', protocol.tile)

    const PMTILES_URL = 'https://openbridge.b-cdn.net/norway-latest.pmtiles'
    const pmtiles = new PMTiles(PMTILES_URL)

    // this is so we share one instance across the JS code and the map renderer
    protocol.add(pmtiles)

    const minDepth = 20
    const heading = 0

    const style: MapOptions = {
      container: map.value as HTMLElement,
      zoom: zoom.value,
      bearing: heading,
      center: [sim.east.value, sim.north.value],
      attributionControl: false,
      dragPan: !shouldCenter.value,
      scrollZoom: shouldCenter.value ? { around: 'center' } : true,
      style: {
        version: 8,
        glyphs: 'https://maps.geo.eu-west-1.amazonaws.com/v2/glyphs/{fontstack}/{range}.pbf',
        sources: {
          source: {
            type: 'vector',
            url: `pmtiles://${PMTILES_URL}`,
            attribution: '© <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>'
          },
          'own-ship': {
            type: 'geojson',
            data: ownShipSource.value
          },
          'heading-line': {
            type: 'geojson',
            data: headingLineSource.value
          },
          'course-line': {
            type: 'geojson',
            data: courseLineSource.value
          },
          'course-arrow': {
            type: 'geojson',
            data: courseArrowSource.value
          },
          'ais-targets': {
            type: 'geojson',
            data: aisSource.value
          }
        },
        layers: [
          {
            id: 'land',
            source: 'source',
            'source-layer': 'land',
            type: 'fill',
            paint: {
              'fill-color': '#CBC783'
            }
          },
          {
            id: 'torr',
            source: 'source',
            'source-layer': 'torr',
            type: 'fill',
            paint: {
              'fill-color': '#6FA885'
            }
          },
          {
            id: 'depth',
            source: 'source',
            'source-layer': 'depth',
            type: 'fill',
            paint: {
              'fill-color': [
                'case',
                [
                  'all',
                  ['to-boolean', ['get', 'minimumsdybde']],
                  ['>', ['to-number', ['get', 'minimumsdybde']], minDepth]
                ],
                '#D8F4E1',
                '#7BC1F1'
              ]
            }
          },
          {
            id: 'place-labels',
            type: 'symbol',
            source: 'source', // <- your source
            'source-layer': 'place', // <- your layer in the tiles
            layout: {
              'text-field': ['coalesce', ['get', 'name:latin'], ['get', 'name']], // fallback
              'text-size': 12,
              'text-font': ['Noto Sans Regular'],
              'text-allow-overlap': false,
              'text-padding': 2,
              'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
              'symbol-placement': 'point'
            },
            paint: {
              'text-color': '#111827',
              'text-halo-color': 'white',
              'text-halo-width': 0
            },
            filter: [
              '<=',
              ['to-number', ['coalesce', ['get', 'rank'], 14]],
              [
                'step',
                ['zoom'],
                2, // z < 4 -> allow ranks <= 2 (biggest places only)
                4,
                4, // z >= 4 -> <= 4
                5,
                6, // z >= 6 -> <= 6
                6,
                8, // z >= 8 -> <= 8
                7,
                10, // z >=10 -> <=10
                12,
                12 // z >=12 -> <=12
              ]
            ]
          },
          {
            id: 'ais-targets',
            type: 'symbol',
            source: 'ais-targets',
            layout: {
              'icon-image': ['get', 'vesselType'],
              'icon-rotate': ['get', 'heading'],
              'icon-rotation-alignment': 'map',
              'icon-size': 1 / 2,
              'icon-overlap': 'always',
              'icon-pitch-alignment': 'map'
            }
          },

          {
            id: 'course-line-backgroud',
            type: 'line',
            source: 'course-line',
            paint: {
              'line-color': 'white',
              'line-width': 2
            },
            layout: {
              'line-cap': 'round'
            }
          },
          {
            id: 'course-line',
            type: 'line',
            source: 'course-line',
            paint: {
              'line-color': 'black',
              'line-width': 1.5,
              'line-dasharray': [3, 3]
            },
            layout: {
              'line-cap': 'round'
            }
          },
          {
            id: 'course-arrow',
            type: 'symbol',
            source: 'course-arrow',
            layout: {
              'icon-image': 'cog-vector',
              'icon-size': 1 / 2,
              'icon-rotate': ['get', 'course'],
              'icon-rotation-alignment': 'map'
            }
          },
          {
            id: 'heading-line',
            type: 'line',
            source: 'heading-line',
            paint: {
              'line-color': 'black',
              'line-width': 1.5
            },
            layout: {
              'line-cap': 'round'
            }
          },
          {
            id: 'own-ship',
            type: 'symbol',
            source: 'own-ship',
            layout: {
              'icon-image': 'own-ship-icon',
              'icon-size': 1 / 2,
              'icon-rotate': ['get', 'heading'],
              'icon-rotation-alignment': 'map'
            }
          }
        ]
      }
    }
    maplibreglMap = new maplibregl.Map(style)
    const images = ['own-ship-icon', 'cog-vector'].map(async (image) => {
      const icon = await maplibreglMap?.loadImage(`/${image}.png`)
      if (icon) {
        maplibreglMap?.addImage(image, icon.data)
      }
    })
    await Promise.all(images)
    for (const [key, image] of Object.entries(vesselImages)) {
      const icon = await maplibreglMap?.loadImage(image)
      if (icon) {
        maplibreglMap?.addImage(key, icon.data)
      }
    }

    startAisStream()
    maplibreglMap.on('zoomend', () => {
      if (maplibreglMap) {
        zoom.value = maplibreglMap.getZoom()
      }
    })
    
    maplibreglMap.on('moveend', updateAisTargetsInView);
  }
})

function getDirectionLine(sim: Sim, directionDeg: number): GeoJSON.FeatureCollection {
  const start: [number, number] = [sim.east.value, sim.north.value]
  const distance = ((sim.vessel.speedForwardThroughWaterKnots.value * 1852) / 60) * 5
  const end: [number, number] = getHeadingEndpoint(
    sim.north.value,
    sim.east.value,
    directionDeg,
    distance
  ) as [number, number]
  return {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: { type: 'LineString', coordinates: [start, end] },
        properties: {}
      }
    ]
  }
}

const headingLineSource = computed((): GeoJSON.FeatureCollection => {
  return getDirectionLine(sim, sim.vessel.headingDeg.value)
})

const courseLineSource = computed((): GeoJSON.FeatureCollection => {
  return getDirectionLine(sim, sim.vessel.courseOverGroundDeg.value)
})

const courseArrowSource = computed((): GeoJSON.FeatureCollection => {
  const distance = ((sim.vessel.speedForwardThroughWaterKnots.value * 1852) / 60) * 5
  const end: [number, number] = getHeadingEndpoint(
    sim.north.value,
    sim.east.value,
    sim.vessel.courseOverGroundDeg.value,
    distance
  ) as [number, number]
  return {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: end },
        properties: {
          course: sim.vessel.courseOverGroundDeg.value
        }
      }
    ]
  }
})

// Watch for changes in sim.north, sim.east, or heading to update marker, recenter map, and update heading line
watch(
  [() => sim.north.value, () => sim.east.value, () => sim.vessel.headingDeg.value],
  ([newNorth, newEast]) => {
    if (!maplibreglMap) return
    if (shouldCenter.value) {
      maplibreglMap.setCenter([newEast, newNorth])
    }
    let direction = 0
    if (mapDirection.value === 'H') {
      direction = sim.vessel.headingDeg.value
    } else if (mapDirection.value === 'C') {
      direction = sim.vessel.courseOverGroundDeg.value
    }
    if (!maplibreglMap.dragPan.isActive()) {
      maplibreglMap.setBearing(direction)
    }
    const own = maplibreglMap.getSource('own-ship') as GeoJSONSource
    if (own) {
      own.setData(ownShipSource.value)
    }
    const headingLine = maplibreglMap.getSource('heading-line') as GeoJSONSource
    if (headingLine) {
      headingLine.setData(headingLineSource.value)
    }
    const courseLine = maplibreglMap.getSource('course-line') as GeoJSONSource
    if (courseLine) {
      courseLine.setData(courseLineSource.value)
    }
    const courseArrow = maplibreglMap.getSource('course-arrow') as GeoJSONSource
    if (courseArrow) {
      courseArrow.setData(courseArrowSource.value)
    }
    const aisTargets = maplibreglMap.getSource('ais-targets') as GeoJSONSource
    if (aisTargets) {
      aisTargets.setData(aisSource.value)
    }
    updateAisTargetsInView()
  },
  { immediate: true }
)

function zoomIn() {
  if (maplibreglMap) {
    maplibreglMap.zoomIn()
  }
}

function zoomOut() {
  if (maplibreglMap) {
    maplibreglMap.zoomOut()
  }
}

onBeforeUnmount(() => {
  if (maplibreglMap) {
    maplibreglMap.remove()
    maplibreglMap = null
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
  if (shouldCenter.value) {
    maplibreglMap?.dragPan.disable()
    maplibreglMap?.scrollZoom.disable()
    maplibreglMap?.scrollZoom.enable({ around: 'center' })
  } else {
    maplibreglMap?.dragPan.enable()
    maplibreglMap?.scrollZoom.disable()
    maplibreglMap?.scrollZoom.enable()
  }
}

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
  }
}

const aisSource = computed((): GeoJSON.FeatureCollection => {
  return {
    type: 'FeatureCollection',
    features: Array.from(aisVessels.value.values()).map((vessel) => ({
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [vessel.longitude, vessel.latitude] },
      properties: {
        heading: vessel.trueHeading || vessel.courseOverGround || 0,
        vesselType: getVesselImage(vessel.shipType)
      }
    }))
  }
})
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
