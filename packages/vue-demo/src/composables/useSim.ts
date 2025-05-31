import { computed, ref, type ComputedRef, type Ref, watch } from 'vue'
import { useJoystickControl, type JoystickControl } from './useJoystickControl'
import { usePropulsionSim, type PropulsionSim } from './usePropulsionSim'
import { useVesselSim, type VesselSim } from './useVesselSim'
import { usePitchRollSim, type PitchRollSim } from './usePitchRollSim'
import { useDepthSim } from './useDepthSim'

export interface Sim {
  controllers: JoystickControl
  vessel: VesselSim
  propulsion: PropulsionSim
  pitchRoll: PitchRollSim
  currentFromAngleDeg: number
  currentSpeedKnots: number
  depth: Ref<number>
  depthDownSampled: Ref<number>
  depthData: Ref<[number[], number[]]>
  north: ComputedRef<number>
  east: ComputedRef<number>
}

let sim: Sim | null = null

export function useSim(): Sim {
  if (sim === null) {
    const currentFromAngleDeg = 45
    const currentSpeedKnots = 2
    const controllers = useJoystickControl()
    const vesselSim = useVesselSim({
      current: { directionFromDeg: currentFromAngleDeg, speedKnots: currentSpeedKnots },
      heading: (270 * Math.PI) / 180,
      u: 2.5
    })
    const rudderSet = computed(() => controllers.y.value * 30)
    const propellerSet = computed(() => controllers.x.value * 100)
    const propulsion = usePropulsionSim({
      rudderSet,
      propellerSet,
      u: vesselSim.u,
      tau: vesselSim.tau
    })
    const pitchRollSim = usePitchRollSim({
      pitch: { periodSeconds: 10, maxAngle: 4 },
      roll: { periodSeconds: 10, maxAngle: 7 },
      initialDeltaAngle: 25
    })
    const depth = useDepthSim(vesselSim.north, vesselSim.east)

    // Depth data for graph
    const depthData = ref<[number[], number[]]>([
      Array.from({ length: 100 }, (_, i) => i + 1),
      Array.from({ length: 100 }, () => 20)
    ])
    const lastDepthTime = ref(0)
    const depthDownSampled = ref(0)

    watch(depth, (newDepth) => {
      const now = Date.now()
      if (now - lastDepthTime.value > 1000) {
        depthDownSampled.value = newDepth
        lastDepthTime.value = now
      }
    })

    watch(depthDownSampled, (newDepth) => {
      const lastX = depthData.value[0][depthData.value[0].length - 1] || 0
      const x = [...depthData.value[0], lastX + 1]
      const y = [...depthData.value[1], newDepth]
      if (x.length > 100) {
        x.shift()
        y.shift()
      }
      depthData.value = [x, y]
    })

    const north = computed(() => {
      return 62.46 + vesselSim.north.value / 1852 / 60
    })

    const east = computed(() => {
      return 6.2 + vesselSim.east.value / 1852 / 60
    })

    sim = {
      controllers,
      vessel: vesselSim,
      propulsion: propulsion,
      pitchRoll: pitchRollSim,
      currentFromAngleDeg,
      currentSpeedKnots,
      depth,
      depthDownSampled,
      depthData,
      north,
      east
    }
  }
  return sim
}
