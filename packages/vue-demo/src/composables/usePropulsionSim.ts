import { ref, watch, onMounted, onUnmounted, type Ref } from 'vue'

export interface PropulsionSim {
  rudder: Ref<number>
  rudderSet: Ref<number>
  propeller: Ref<number>
  propellerSet: Ref<number>
  tau: Ref<number[]>
  reset: () => void
}

// Constants
const MAX_RUDDER_ANGLE_DEG = 10 // degrees
const MIN_RUDDER_ANGLE_DEG = -10
const MAX_PROPELLER_SPEED = 100 // percent
const MIN_PROPELLER_SPEED = -100
const LOWPASS_TAU = 0.3 // time constant for lowpass filter (seconds)
const DT = 1 / 60 // simulation time step (seconds)
const MAX_RUDDER_RATE = 2 // deg/s
const MAX_PROPELLER_RATE = 10 // units/s

function deg2rad(deg: number) {
  return (deg * Math.PI) / 180
}

/**
 * @param options.u ref to surge speed (m/s)
 * @param options.rudderSet ref to rudder angle (degrees)
 * @param options.propellerSet ref to propeller speed (-100 to 100)
 */
export function usePropulsionSim(options: {
  u: Ref<number>
  rudderSet: Ref<number>
  propellerSet: Ref<number>
  tau: Ref<number[]>
}): PropulsionSim {
  // Setpoints for rudder angle and propeller speed
  const rudderSet = options.rudderSet
  const propellerSet = options.propellerSet
  const u = options.u
  const tau = options.tau

  // Simulated values (after lowpass filter and rate limiting)
  const rudder = ref(0) // degrees
  const propeller = ref(0) // -100 to 100

  // Lowpass filter for setpoint tracking
  function lowpassFilter(current: number, target: number, tau: number, dt: number) {
    // Simple first-order lowpass filter
    return current + (dt / tau) * (target - current)
  }

  // Rate limiter
  function rateLimit(current: number, target: number, maxRate: number, dt: number) {
    const maxDelta = maxRate * dt
    const delta = target - current
    if (delta > maxDelta) return current + maxDelta
    if (delta < -maxDelta) return current - maxDelta
    return target
  }

  // Simulation loop
  let intervalId: number | null = null

  function simulateStep() {
    // Lowpass filter
    const rudderFiltered = lowpassFilter(rudder.value, rudderSet.value, LOWPASS_TAU, DT)
    const propellerFiltered = lowpassFilter(propeller.value, propellerSet.value, LOWPASS_TAU, DT)

    // Rate limiting
    rudder.value = rateLimit(rudder.value, rudderFiltered, MAX_RUDDER_RATE, DT)
    propeller.value = rateLimit(propeller.value, propellerFiltered, MAX_PROPELLER_RATE, DT)

    // Set tau for useVesselSim
    // Simplified model: tau = [X, Y, N]
    // X: propeller force, N: rudder moment, Y: rudder force (sway)
    // Propeller force proportional to propeller speed
    // Rudder force and moment proportional to u^2 and rudder angle
    const uVal = Number(u.value)
    const rudderRad = deg2rad(rudder.value)
    // Adjust gains as needed for your model
    const X = propeller.value * 2e3
    const Y = rudderRad * uVal ** 2 * 2e2
    const N = rudderRad * uVal ** 2 * 2e3
    tau.value = [X, Y, N]
  }

  onMounted(() => {
    intervalId = window.setInterval(simulateStep, DT * 1000)
  })

  onUnmounted(() => {
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  })

  // Limit setpoint values
  watch(rudderSet, (val) => {
    if (val > MAX_RUDDER_ANGLE_DEG) rudderSet.value = MAX_RUDDER_ANGLE_DEG
    if (val < MIN_RUDDER_ANGLE_DEG) rudderSet.value = MIN_RUDDER_ANGLE_DEG
  })
  watch(propellerSet, (val) => {
    if (val > MAX_PROPELLER_SPEED) propellerSet.value = MAX_PROPELLER_SPEED
    if (val < MIN_PROPELLER_SPEED) propellerSet.value = MIN_PROPELLER_SPEED
  })

  // Reset function
  function reset() {
    rudder.value = 0
    propeller.value = 0
  }

  return {
    rudder,
    rudderSet,
    propeller,
    propellerSet,
    tau,
    reset
  }
}
