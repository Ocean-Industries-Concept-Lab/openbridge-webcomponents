<template>
    <div class="ar-video-container">
        <video ref="arVideo" src="https://vz-39fc4309-d50.b-cdn.net/53fb1b22-cb65-4b11-9036-fd0dfb8d70f0/playlist.m3u8"
            height="768" width="1024" autoplay loop muted playsinline class="ar-video"
            @click="handleVideoClick"></video>
        <ObcPoiTargetButtonGroup v-if="Math.abs(xLarge.x - xFast.x) < (48 / 1024) * 100" :position-vertical="'35%'">
            <ObcPoiTarget class="ar-poi-target" ref="large" :relative-direction="80" :position-horizontal="xLarge.y"
                :style="{ left: xLarge.x + '%' }">
            </ObcPoiTarget>
            <ObcPoiTarget class="ar-poi-target fast" ref="fast" :relative-direction="90" :position-horizontal="xFast.y"
                :style="{ left: xFast.x + '%' }">
            </ObcPoiTarget>
        </ObcPoiTargetButtonGroup>

        <ObcPoiTarget v-if="Math.abs(xLarge.x - xFast.x) >= (48 / 1024) * 100" class="ar-poi-target" ref="large"
            :relative-direction="80" :position-horizontal="xLarge.y" :style="{ left: xLarge.x + '%' }">
        </ObcPoiTarget>
        <ObcPoiTarget v-if="Math.abs(xLarge.x - xFast.x) >= (48 / 1024) * 100" class="ar-poi-target" ref="fast"
            :relative-direction="90" :position-horizontal="xFast.y" :style="{ left: xFast.x + '%' }">
        </ObcPoiTarget>



    </div>
</template>

<script setup lang="ts">
import "video.js/dist/video-js.css";

import videojs from "video.js";
import { onMounted, ref, onBeforeUnmount } from 'vue';
import ObcPoiTarget from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/ar/poi-target/ObcPoiTarget.vue';
import ObcPoiTargetButtonGroup from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/ar/poi-target-button-group/ObcPoiTargetButtonGroup.vue';
import type Player from "video.js/dist/types/player";

const arVideo = ref<HTMLVideoElement | null>(null);
const fast = ref<InstanceType<typeof ObcPoiTarget> | null>(null);
const large = ref<InstanceType<typeof ObcPoiTarget> | null>(null);
const xLarge = ref({ x: 31.5, y: 200 });
const xFast = ref({ x: 51, y: 190 });

const keyframes = {
    fast: [
        { t: 0, x: 31.5, h: 200 },
        { t: 0.414104, x: 31.84, h: 211.00 },
        { t: 1.119992, x: 31.74, h: 217.00 },
        { t: 2.141116, x: 32.32, h: 207.00 },
        { t: 2.917705, x: 32.8125, h: 200 },
        { t: 4.5, x: 36.8, h: 210 },
        { t: 5.884246, x: 41.89453125, h: 206 },
        { t: 7.33, x: 46.5, h: 215 },
        { t: 8.058186, x: 47.4609375, h: 209 },
        { t: 10.344603, x: 51.3671875, h: 200 },
        { t: 12.792545, x: 54.98046875, h: 203 },
        { "t": 14.45667, "x": 55.56640625, "h": 211 },
        { "t": 15.880531, "x": 57.421875, "h": 213 },
        { "t": 16.906411, "x": 58.88671875, "h": 195 },
        { "t": 18.034906, "x": 60.05859375, "h": 177 },
        { "t": 19.78957, "x": 63.96484375, "h": 189 },
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
        { t: 43.997638, x: 94.921875, h: 125 },
    ],
    large: [{ "t": 0, "x": 51.3671875, "h": 190 }, { "t": 0.740905, "x": 50.9765625, "h": 207 }, { "t": 1.670968, "x": 49.8046875, "h": 202 }, { "t": 2.884489, "x": 49.31640625, "h": 188 }, { "t": 4.18992, "x": 50.390625, "h": 201 }, { "t": 4.890533, "x": 52.05078125, "h": 201 }, { "t": 5.645697, "x": 54.00390625, "h": 195 }, { "t": 6.482313, "x": 55.2734375, "h": 203 }, { "t": 7.269345, "x": 56.640625, "h": 205 }, { "t": 8.307955, "x": 57.12890625, "h": 197 }, { "t": 9.253666, "x": 57.12890625, "h": 199 }, { "t": 10.232705, "x": 57.8125, "h": 192 }, { "t": 10.997486, "x": 58.59375, "h": 189 }, { "t": 11.682492, "x": 59.1796875, "h": 192 }, { "t": 12.385106, "x": 58.7890625, "h": 191 }, { "t": 13.716098, "x": 58.3984375, "h": 196 }, { "t": 14.60691, "x": 57.421875, "h": 201 }, { "t": 15.469085, "x": 57.421875, "h": 204 }, { "t": 16.419076, "x": 57.51953125, "h": 193 }, { "t": 17.22534, "x": 57.32421875, "h": 181 }, { "t": 18.231843, "x": 57.421875, "h": 167 }, { "t": 19.047515, "x": 58.10546875, "h": 171 }, { "t": 19.916258, "x": 58.59375, "h": 180 }, { "t": 20.649097, "x": 57.32421875, "h": 184 }, { "t": 21.530188, "x": 55.6640625, "h": 179 }, { "t": 22.343294, "x": 54.8828125, "h": 173 }, { "t": 23.170257, "x": 54.78515625, "h": 173 }, { "t": 23.971718, "x": 56.0546875, "h": 176 }, { "t": 24.745182, "x": 55.76171875, "h": 171 }, { "t": 25.565603, "x": 55.6640625, "h": 167 }, { "t": 26.46819, "x": 55.078125, "h": 162 }, { "t": 27.154845, "x": 54.58984375, "h": 164 }, { "t": 27.993383, "x": 54.6875, "h": 156 }, { "t": 28.720161, "x": 54.6875, "h": 151 }, { "t": 29.391205, "x": 55.37109375, "h": 149 }, { "t": 30.067253, "x": 55.95703125, "h": 152 }, { "t": 30.827709, "x": 55.46875, "h": 151 }, { "t": 31.369404, "x": 55.2734375, "h": 153 }, { "t": 32.321851, "x": 55.6640625, "h": 153 }, { "t": 33.021565, "x": 55.76171875, "h": 149 }, { "t": 33.932783, "x": 55.76171875, "h": 152 }, { "t": 34.791618, "x": 55.2734375, "h": 158 }, { "t": 35.652239, "x": 55.078125, "h": 160 }, { "t": 36.457661, "x": 54.6875, "h": 161 }, { "t": 37.174563, "x": 54.4921875, "h": 158 }, { "t": 37.875706, "x": 55.078125, "h": 155 }, { "t": 38.671806, "x": 54.78515625, "h": 148 }, { "t": 39.422557, "x": 54.6875, "h": 136 }, { "t": 40.130636, "x": 55.078125, "h": 126 }, { "t": 40.872285, "x": 55.17578125, "h": 130 }, { "t": 41.675879, "x": 54.8828125, "h": 135 }, { "t": 42.572183, "x": 54.39453125, "h": 129 }, { "t": 43.466537, "x": 54.8828125, "h": 120 }, { "t": 44.24777, "x": 54.39453125, "h": 117 }]
}

const setPosition = (t: number, frames: { t: number, x: number, h: number }[], f: InstanceType<typeof ObcPoiTarget> | null, fast: boolean) => {
    if (f === null) throw new Error('f is null');

    // Handle edge cases: before first or after last keyframe
    if (t <= frames[0].t) {
        f.$el.height = frames[0].h;
        f.$el.style.left = `${frames[0].x}%`;
        return;
    }
    if (t >= frames[frames.length - 1].t) {
        f.$el.height = frames[frames.length - 1].h;
        f.$el.style.left = `${frames[frames.length - 1].x}%`;
        return;
    }

    // Find the two closest keyframes
    let i = 0;
    while (i < frames.length - 1 && t > frames[i + 1].t) {
        i++;
    }
    const kf0 = frames[i];
    const kf1 = frames[i + 1];

    // Linear interpolation
    const alpha = (t - kf0.t) / (kf1.t - kf0.t);
    const x = kf0.x + (kf1.x - kf0.x) * alpha;
    const h = kf0.h + (kf1.h - kf0.h) * alpha;

    f.$el.height = h;
    f.$el.style.left = `${x}%`;
    if (fast) {
        xFast.value = { x: x, y: h };
    } else {
        xLarge.value = { x: x, y: h };
    }
}

function handleKeydown(e: KeyboardEvent) {
    if (e.code === 'Space') {
        if (arVideo.value) {
            if (arVideo.value.paused) {
                player.value?.play();
            } else {
                player.value?.pause();
            }
        }
        e.preventDefault();
    }
}

let animationFrameId: number | null = null;

function animationLoop() {
    if (arVideo.value && !arVideo.value.paused) {
        const time = player.value?.currentTime() ?? 0;
        setPosition(time, keyframes.fast, fast.value, true);
        setPosition(time, keyframes.large, large.value, false);
    }
    animationFrameId = requestAnimationFrame(animationLoop);
}

const allPoints: { t: number, x: number, h: number }[] = [];

function handleVideoClick(event: MouseEvent) {
    const video = arVideo.value;
    if (!video) return;
    const rect = video.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = (event.clientY - rect.top) - 270;
    const time = video.currentTime;
    allPoints.push({ t: time, x: x, h: y });
    console.log(JSON.stringify(allPoints));
}
const player = ref<Player | null>(null);

onMounted(() => {
    if (!arVideo.value) return;
    player.value = videojs(arVideo.value, {
        sources: [{
            src: `https://vz-39fc4309-d50.b-cdn.net/53fb1b22-cb65-4b11-9036-fd0dfb8d70f0/playlist.m3u8`,
            type: 'application/x-mpegURL'
        }],
        height: 768,
        width: 1024,
        controls: false,
        muted: true,
        autoplay: true,
        loop: true,
        playsinline: true,
    });
    setPosition(0, keyframes.fast, fast.value, true);
    setPosition(0, keyframes.large, large.value, false);
    window.addEventListener('keydown', handleKeydown);
    animationLoop();
});

onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeydown);
    if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
    }
    if (player.value) {
        player.value.dispose();
    }
});
</script>

<style scoped>
.ar-video-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 1024px;
    height: 768px;
    background: black;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.ar-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.ar-poi-target {
    position: absolute;
    top: 35%;
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