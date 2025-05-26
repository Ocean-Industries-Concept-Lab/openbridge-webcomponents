<template>
    <div class="targets-list">
        <div class="header">
            <div class="sort-controls">
                <select v-model="sortBy" @change="updateSort" class="sort-select">
                    <option value="distance">Distance</option>
                    <option value="cpa">CPA</option>
                    <option value="tcpa">TCPA</option>
                </select>
            </div>
        </div>
        <div class="targets-container">
            <div v-if="sortedTargets.length === 0" class="no-targets">
                No targets found
            </div>
            <div v-else class="target-item" v-for="target in sortedTargets" :key="target.mmsi">
                <div class="target-header">
                    <div class="target-name">{{ target.name || 'Unknown vessel' }}</div>
                    <div class="target-mmsi">{{ target.mmsi }}</div>
                </div>
                <div class="target-data">
                    <div class="data-row">
                        <span class="label">Distance:</span>
                        <span class="value">{{ formatDistance(target.distance) }} NM</span>
                    </div>
                    <div class="data-row">
                        <span class="label">Bearing:</span>
                        <span class="value">{{ formatBearing(target.bearingDeg) }}°</span>
                    </div>
                    <div v-if="target.cpa !== undefined" class="data-row">
                        <span class="label">CPA:</span>
                        <span class="value" :class="{ 'danger': target.cpa < 0.5 }">{{ formatDistance(target.cpa) }} NM</span>
                    </div>
                    <div v-if="target.timeToCpa !== undefined" class="data-row">
                        <span class="label">TCPA:</span>
                        <span class="value">{{ formatTime(target.timeToCpa) }}</span>
                    </div>
                    <div class="data-row">
                        <span class="label">Speed:</span>
                        <span class="value">{{ formatSpeed(target.speedOverGround) }} kn</span>
                    </div>
                    <div v-if="target.courseOverGround !== null" class="data-row">
                        <span class="label">Course:</span>
                        <span class="value">{{ formatBearing(target.courseOverGround) }}°</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, unref } from 'vue';
import { useSim } from '@/composables/useSim';
import { getCpa, type AisData } from '@/business/aisData';
import type { Ref } from 'vue';

interface TargetWithCpa extends AisData {
    distance: number;
    bearingDeg: number;
    cpa?: number;
    timeToCpa?: number;
}

const props = defineProps<{
    vessels: Ref<Map<number, AisData>> | Map<number, AisData>;
}>();

const sim = useSim();
const sortBy = ref<'distance' | 'cpa' | 'tcpa'>('distance');

// Convert sim data to AisData format for CPA calculation
const ownShipData = computed((): AisData => ({
    mmsi: 0, // Own ship
    latitude: sim.north.value,
    longitude: sim.east.value,
    courseOverGround: sim.vessel.courseOverGroundDeg.value,
    speedOverGround: sim.vessel.speedForwardOverGroundKnots.value,
    name: 'Own Ship',
    msgtime: new Date().toISOString(),
    shipType: 0,
    trueHeading: sim.vessel.headingDeg.value,
    rateOfTurn: sim.vessel.rotationDegPerMinute.value / 60, // Convert to degrees per second
    navigationStatus: 0
}));

// Calculate CPA for all targets
const targetsWithCpa = computed((): TargetWithCpa[] => {
    const targets: TargetWithCpa[] = [];
    const ownShip = ownShipData.value;
    const vessels = unref(props.vessels);

    vessels.forEach((vessel) => {
        const cpaResult = getCpa(vessel, ownShip);

        const target: TargetWithCpa = {
            ...vessel,
            distance: cpaResult.distance,
            bearingDeg: cpaResult.bearingDeg,
        };

        // Add CPA and TCPA if available
        if ('cpa' in cpaResult) {
            target.cpa = cpaResult.cpa;
            target.timeToCpa = cpaResult.timeToCpa;
        }

        targets.push(target);
    });

    return targets;
});

// Sort targets based on selected criteria
const sortedTargets = computed(() => {
    const targets = [...targetsWithCpa.value];

    switch (sortBy.value) {
        case 'distance':
            return targets.sort((a, b) => a.distance - b.distance);
        case 'cpa':
            return targets.sort((a, b) => {
                // Targets without CPA come last
                if (a.cpa === undefined && b.cpa === undefined) return a.distance - b.distance;
                if (a.cpa === undefined) return 1;
                if (b.cpa === undefined) return -1;
                return a.cpa - b.cpa;
            });
        case 'tcpa':
            return targets.sort((a, b) => {
                // Targets without TCPA come last
                if (a.timeToCpa === undefined && b.timeToCpa === undefined) return a.distance - b.distance;
                if (a.timeToCpa === undefined) return 1;
                if (b.timeToCpa === undefined) return -1;
                return a.timeToCpa - b.timeToCpa;
            });
        default:
            return targets;
    }
});

function updateSort() {
    // Trigger reactivity
}

function formatDistance(distance: number): string {
    return distance.toFixed(2);
}

function formatBearing(bearing: number): string {
    return Math.round(bearing).toString().padStart(3, '0');
}

function formatSpeed(speed: number): string {
    return speed.toFixed(1);
}

function formatTime(timeInHours: number): string {
    if (timeInHours < 1) {
        const minutes = Math.round(timeInHours * 60);
        return `${minutes}m`;
    } else {
        const hours = Math.floor(timeInHours);
        const minutes = Math.round((timeInHours - hours) * 60);
        return `${hours}h ${minutes}m`;
    }
}
</script>

<style scoped>
.targets-list {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.header {
    padding: 8px 16px;
    border-bottom: 1px solid var(--border-outline-color);
    background: var(--container-section-color);
}

.sort-controls {
    display: flex;
    align-items: center;
    gap: 8px;
}

.sort-select {
    padding: 4px 8px;
    border: 1px solid var(--border-outline-color);
    border-radius: 4px;
    background: var(--container-backdrop-color);
    color: var(--element-neutral-color);
    font-size: var(--font-size-075);
}

.targets-container {
    flex: 1;
    overflow-y: auto;
    padding: 8px;
}

.no-targets {
    text-align: center;
    color: var(--element-neutral-color);
    padding: 32px 16px;
    font-style: italic;
}

.target-item {
    background: var(--container-backdrop-color);
    border: 1px solid var(--border-outline-color);
    border-radius: 4px;
    margin-bottom: 8px;
    padding: 12px;
}

.target-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    padding-bottom: 4px;
    border-bottom: 1px solid var(--border-divider-color);
}

.target-name {
    font-weight: var(--font-weight-semibold);
    color: var(--element-neutral-color);
    font-size: var(--font-size-100);
}

.target-mmsi {
    font-size: var(--font-size-075);
    color: var(--element-neutral-color);
    opacity: 0.7;
}

.target-data {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.data-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.label {
    font-size: var(--font-size-075);
    color: var(--element-neutral-color);
    opacity: 0.8;
}

.value {
    font-size: var(--font-size-075);
    color: var(--element-neutral-color);
    font-weight: var(--font-weight-medium);
}

.value.danger {
    color: var(--element-danger-color);
    font-weight: var(--font-weight-bold);
}
</style> 