<template>
  <div class="ar-video-container">
    <video
      ref="arVideo"
      autoplay
      loop
      muted
      playsinline
      class="ar-video"
      @click="handleVideoClick"
    ></video>

    <ObcPoiData
      ref="large"
      class="ar-poi-target"
      :relative-direction="80"
      :y="xLarge.y"
      :style="{ left: xLarge.x + '%' }"
    >
    </ObcPoiData>

    <ObcPoiData
      ref="fast"
      class="ar-poi-target"
      :relative-direction="90"
      :y="xFast.y"
      :style="{ left: xFastCalc.x + '%' }"
      :button-offset-x="xFastCalc.offset"
    >
    </ObcPoiData>
  </div>
</template>

<script setup lang="ts">
import 'video.js/dist/video-js.css'

import { onMounted, ref, onBeforeUnmount, computed } from 'vue'
import ObcPoiData from '@oicl/openbridge-webcomponents-vue/ar/poi/ObcPoiData.vue'
import Hls from 'hls.js'

const arVideo = ref<HTMLVideoElement | null>(null)
const fast = ref<InstanceType<typeof ObcPoiData> | null>(null)
const large = ref<InstanceType<typeof ObcPoiData> | null>(null)
const xLarge = ref({ x: 31.5, y: 200 })
const xFast = ref({ x: 51, y: 190 })

const xFastCalc = computed(() => {
  const width = arVideo.value?.getBoundingClientRect().width ?? 1024
  if (Math.abs(xLarge.value.x - xFast.value.x) > (48 / width) * 100) {
    return { x: xFast.value.x, y: xFast.value.y, offset: 0 }
  } else if (xLarge.value.x - xFast.value.x > 0) {
    const newX = xLarge.value.x - (48 / width) * 100
    const offset = newX - xFast.value.x
    const offsetPx = (-offset * width) / 100
    return { x: newX, y: xFast.value.y, offset: offsetPx }
  } else {
    const newX = xLarge.value.x + (48 / width) * 100
    const offset = newX - xFast.value.x
    const offsetPx = (-offset * width) / 100
    return { x: newX, y: xFast.value.y, offset: offsetPx }
  }
})

const keyframes = {
  fast: [
    { t: 0, x: 31.5, h: 200 },
    { t: 0.414104, x: 31.84, h: 211.0 },
    { t: 1.119992, x: 31.74, h: 217.0 },
    { t: 2.141116, x: 32.32, h: 207.0 },
    { t: 2.917705, x: 32.8125, h: 200 },
    { t: 4.5, x: 36.8, h: 210 },
    { t: 5.884246, x: 41.89453125, h: 206 },
    { t: 7.33, x: 46.5, h: 215 },
    { t: 8.058186, x: 47.4609375, h: 209 },
    { t: 10.344603, x: 51.3671875, h: 200 },
    { t: 12.792545, x: 54.98046875, h: 203 },
    { t: 14.45667, x: 55.56640625, h: 211 },
    { t: 15.880531, x: 57.421875, h: 213 },
    { t: 16.906411, x: 58.88671875, h: 195 },
    { t: 18.034906, x: 60.05859375, h: 177 },
    { t: 19.78957, x: 63.96484375, h: 189 },
    { t: 22.440895, x: 63.76953125, h: 185 },
    { t: 23.511534, x: 65.0390625, h: 184 },
    { t: 24.900687, x: 67.67578125, h: 181 },
    { t: 27.516976, x: 70.5078125, h: 170 },
    { t: 28.870111, x: 72.75390625, h: 159 },
    { t: 31.897547, x: 78.02734375, h: 161 },
    { t: 33.740031, x: 80.95703125, h: 159 },
    { t: 34.714117, x: 81.54296875, h: 167 },
    { t: 37.141955, x: 84.66796875, h: 164 },
    { t: 38.43324, x: 86.62109375, h: 159 },
    { t: 39.249822, x: 87.98828125, h: 146 },
    { t: 40.171051, x: 89.94140625, h: 134 },
    { t: 40.799338, x: 90.625, h: 135 },
    { t: 42.037715, x: 91.9921875, h: 142 },
    { t: 43.312437, x: 94.140625, h: 129 },
    { t: 43.997638, x: 94.921875, h: 125 }
  ],
  large: [
    { t: 0, x: 51.3671875, h: 190 },
    { t: 0.740905, x: 50.9765625, h: 207 },
    { t: 1.670968, x: 49.8046875, h: 202 },
    { t: 2.884489, x: 49.31640625, h: 188 },
    { t: 4.18992, x: 50.390625, h: 201 },
    { t: 4.890533, x: 52.05078125, h: 201 },
    { t: 5.645697, x: 54.00390625, h: 195 },
    { t: 6.482313, x: 55.2734375, h: 203 },
    { t: 7.269345, x: 56.640625, h: 205 },
    { t: 8.307955, x: 57.12890625, h: 197 },
    { t: 9.253666, x: 57.12890625, h: 199 },
    { t: 10.232705, x: 57.8125, h: 192 },
    { t: 10.997486, x: 58.59375, h: 189 },
    { t: 11.682492, x: 59.1796875, h: 192 },
    { t: 12.385106, x: 58.7890625, h: 191 },
    { t: 13.716098, x: 58.3984375, h: 196 },
    { t: 14.60691, x: 57.421875, h: 201 },
    { t: 15.469085, x: 57.421875, h: 204 },
    { t: 16.419076, x: 57.51953125, h: 193 },
    { t: 17.22534, x: 57.32421875, h: 181 },
    { t: 18.231843, x: 57.421875, h: 167 },
    { t: 19.047515, x: 58.10546875, h: 171 },
    { t: 19.916258, x: 58.59375, h: 180 },
    { t: 20.649097, x: 57.32421875, h: 184 },
    { t: 21.530188, x: 55.6640625, h: 179 },
    { t: 22.343294, x: 54.8828125, h: 173 },
    { t: 23.170257, x: 54.78515625, h: 173 },
    { t: 23.971718, x: 56.0546875, h: 176 },
    { t: 24.745182, x: 55.76171875, h: 171 },
    { t: 25.565603, x: 55.6640625, h: 167 },
    { t: 26.46819, x: 55.078125, h: 162 },
    { t: 27.154845, x: 54.58984375, h: 164 },
    { t: 27.993383, x: 54.6875, h: 156 },
    { t: 28.720161, x: 54.6875, h: 151 },
    { t: 29.391205, x: 55.37109375, h: 149 },
    { t: 30.067253, x: 55.95703125, h: 152 },
    { t: 30.827709, x: 55.46875, h: 151 },
    { t: 31.369404, x: 55.2734375, h: 153 },
    { t: 32.321851, x: 55.6640625, h: 153 },
    { t: 33.021565, x: 55.76171875, h: 149 },
    { t: 33.932783, x: 55.76171875, h: 152 },
    { t: 34.791618, x: 55.2734375, h: 158 },
    { t: 35.652239, x: 55.078125, h: 160 },
    { t: 36.457661, x: 54.6875, h: 161 },
    { t: 37.174563, x: 54.4921875, h: 158 },
    { t: 37.875706, x: 55.078125, h: 155 },
    { t: 38.671806, x: 54.78515625, h: 148 },
    { t: 39.422557, x: 54.6875, h: 136 },
    { t: 40.130636, x: 55.078125, h: 126 },
    { t: 40.872285, x: 55.17578125, h: 130 },
    { t: 41.675879, x: 54.8828125, h: 135 },
    { t: 42.572183, x: 54.39453125, h: 129 },
    { t: 43.466537, x: 54.8828125, h: 120 },
    { t: 44.24777, x: 54.39453125, h: 117 }
  ]
}

const mapFrameToViewPosition = (x: number, h: number) => {
  const height = arVideo.value?.getBoundingClientRect().height ?? 1
  const labelHeight = height / 2 - 100

  const xTransformed = (576 / 768) * (x - 50) + 50
  const hPoint = ((h + 270) / 768) * height
  const hTransformed = hPoint - labelHeight

  return { x: xTransformed, y: hTransformed }
}

const setPosition = (
  t: number,
  frames: { t: number; x: number; h: number }[],
  f: InstanceType<typeof ObcPoiData> | null,
  fast: boolean
) => {
  if (f === null) throw new Error('f is null')

  let x = frames[0]?.x ?? 0
  let h = frames[0]?.h ?? 0

  if (frames[0] && t <= frames[0].t) {
    x = frames[0].x
    h = frames[0].h
  } else if (frames[frames.length - 1] && t >= frames[frames.length - 1]!.t) {
    x = frames[frames.length - 1]!.x
    h = frames[frames.length - 1]!.h
  } else {
    let i = 0
    while (i < frames.length - 1 && t > frames[i + 1]!.t) {
      i++
    }
    const kf0 = frames[i]!
    const kf1 = frames[i + 1]!

    const alpha = (t - kf0.t) / (kf1.t - kf0.t)
    x = kf0.x + (kf1.x - kf0.x) * alpha
    h = kf0.h + (kf1.h - kf0.h) * alpha
  }

  const transformed = mapFrameToViewPosition(x, h)
  if (fast) {
    xFast.value = transformed
  } else {
    xLarge.value = transformed
  }
}
function handleKeydown(e: KeyboardEvent) {
  if (e.code === 'Space') {
    if (arVideo.value) {
      if (arVideo.value.paused) {
        arVideo.value.play()
      } else {
        arVideo.value.pause()
      }
    }
    e.preventDefault()
  }
}

let animationFrameId: number | null = null

function animationLoop() {
  if (arVideo.value && !arVideo.value.paused) {
    const time = arVideo.value.currentTime
    setPosition(time, keyframes.fast, fast.value, true)
    setPosition(time, keyframes.large, large.value, false)
  }
  animationFrameId = requestAnimationFrame(animationLoop)
}

const allPoints: { t: number; x: number; h: number }[] = []

function handleVideoClick(event: MouseEvent) {
  const video = arVideo.value
  if (!video) return
  const rect = video.getBoundingClientRect()
  const x = ((event.clientX - rect.left) / rect.width) * 100
  const y = event.clientY - rect.top - 270
  const time = video.currentTime
  allPoints.push({ t: time, x: x, h: y })
  console.log(JSON.stringify(allPoints))
}

onMounted(() => {
  initPlayer()
  setPosition(0, keyframes.fast, fast.value, true)
  setPosition(0, keyframes.large, large.value, false)
  window.addEventListener('keydown', handleKeydown)
  animationLoop()
})

let hls: Hls | null = null

function initPlayer() {
  const video = arVideo.value

  if (!video) return
  const src = `https://vz-39fc4309-d50.b-cdn.net/53fb1b22-cb65-4b11-9036-fd0dfb8d70f0/playlist.m3u8`

  if (Hls.isSupported()) {
    hls = new Hls()
    hls.loadSource(src)
    hls.attachMedia(video)
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      video.play()
    })
  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = src
    video.addEventListener('loadedmetadata', () => {
      video.play()
    })
  } else {
    console.error('HLS is not supported in this browser.')
  }
}

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
  }
  if (hls) {
    hls.destroy()
  }
})
</script>

<style scoped>
.ar-video-container {
  position: fixed;
  top: 48px;
  left: 0;
  width: 100%;
  height: calc(100% - 48px);
  display: flex;
  justify-content: center;
  align-items: center;
}

.ar-video {
  width: 100%;
  height: fit-content;
  object-fit: contain;
  anchor-name: --video;
}

.ar-poi-target {
  position: absolute;
  position-anchor: --video;
  top: calc(anchor-size(height) / 2 + anchor(top) - 100px);
}

.fast {
  z-index: 2;
}

.vjs-control-bar {
  display: none !important;
}

.vjs-big-play-button {
  display: none !important;
}
</style>
