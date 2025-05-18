import { ref, watch, onMounted, onUnmounted } from 'vue'

// Constants
const MAX_RUDDER_ANGLE_DEG = 10 // degrees
const MIN_RUDDER_ANGLE_DEG = -10
const MAX_PROPELLER_SPEED = 100 // percent
const MIN_PROPELLER_SPEED = -100
const LOWPASS_TAU = 0.3 // time constant for lowpass filter (seconds)
const DT = 0.1 // simulation time step (seconds)
const MAX_RUDDER_RATE = 2 // deg/s
const MAX_PROPELLER_RATE = 20 // units/s

function deg2rad(deg: number) {
  return (deg * Math.PI) / 180
}

/**
 * @param tau ref to the tau array used in useVesselSim
 * @param u ref to surge speed (m/s)
 */
export function usePropulsionSim(tau: ReturnType<typeof ref>, u: ReturnType<typeof ref>) {
  // Setpoints for rudder angle and propeller speed
  const rudderSet = ref(0) // degrees
  const propellerSet = ref(0) // -100 to 100

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
    const X = propeller.value * 1e4
    const Y = -rudderRad * uVal ** 2 * 2e3 // negative because rudder gives opposite sway
    const N = rudderRad * uVal ** 2 * 1e4
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
    rudderSet.value = 0
    propellerSet.value = 0
    rudder.value = 0
    propeller.value = 0
  }

  return {
    rudderSet,
    propellerSet,
    rudder,
    propeller,
    reset
  }
}
