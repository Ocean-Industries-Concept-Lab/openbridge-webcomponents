<script setup lang="ts">
import ObcSpeedDirections from '@oicl/openbridge-webcomponents-vue/navigation-instruments/speed-directions/ObcSpeedDirections.vue'
import { VesselImage } from '@oicl/openbridge-webcomponents/dist/navigation-instruments/watch/vessel'
import { useSim } from '../composables/useSim'
const sim = useSim()

// Stable reference: obc-readout uses identity-based change detection, so a
// shared constant avoids re-triggering updates on every render.
const hintedZerosValueOptions = { hintedZeros: true }

defineProps<{
  vessel: 'psv' | 'ferry'
}>()

function formatSpeedValue(value: number) {
  return Math.min(Math.max(Math.round(Math.abs(value)), 0), 99)
}
</script>

<template>
  <div class="vessel-motion-container">
    <!-- TODO(#1081): double-check the athwart sign convention.
         obc-speed-directions treats positive athwart speed as motion to
         starboard, while the previous manual layout rendered positive sideways
         speed on the port side. The sim's `v` is standard 3-DOF sway
         (positive = starboard), so the values are bound unnegated here on the
         assumption the old rendering was mirrored; if the old port-side
         rendering turns out to be correct, negate both athwart bindings. -->
    <ObcSpeedDirections
      class="speed-directions"
      :speed-along-knots="sim.vessel.speedForwardOverGroundKnots.value"
      :speed-athwart-bow-knots="sim.vessel.speedSidewaysOverGroundKnotsAtBow.value"
      :speed-athwart-stern-knots="sim.vessel.speedSidewaysOverGroundKnotsAtStern.value"
      :tinted-arrows="true"
      :vessel-image="vessel === 'psv' ? VesselImage.psvTop : VesselImage.carFerryTop"
    />
    <!-- TODO(#1081): obc-speed-directions renders no numeric readouts, so the
         readouts that used to be overlaid on the manual layout are kept as a
         separate group (same pattern as OwnShipData.vue). Revisit the
         placement with design; also note the forward-speed readout is
         labelled "Bow" (pre-existing duplicate of the athwart bow label). -->
    <div class="readouts">
      <obc-readout
        :value.prop="Number(formatSpeedValue(sim.vessel.speedSidewaysOverGroundKnotsAtBow.value))"
        :maxDigits.prop="2"
        :fractionDigits.prop="0"
        :valueOptions.prop="hintedZerosValueOptions"
        size="large"
        :priority.prop="'regular'"
        label="Bow"
        unit="kn"
      />
      <obc-readout
        :value.prop="Number(formatSpeedValue(sim.vessel.speedForwardOverGroundKnots.value))"
        :maxDigits.prop="2"
        :fractionDigits.prop="0"
        :valueOptions.prop="hintedZerosValueOptions"
        size="large"
        :priority.prop="'regular'"
        label="Bow"
        unit="kn"
      />
      <obc-readout
        :value.prop="Number(formatSpeedValue(sim.vessel.speedSidewaysOverGroundKnotsAtStern.value))"
        :maxDigits.prop="2"
        :fractionDigits.prop="0"
        :valueOptions.prop="hintedZerosValueOptions"
        size="large"
        :priority.prop="'regular'"
        label="Aft"
        unit="kn"
      />
    </div>
  </div>
</template>

<style scoped>
.vessel-motion-container {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: 16px;
}

.speed-directions {
  flex: 1;
  min-height: 0;
  width: 100%;
}

.readouts {
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 16px;
}
</style>
