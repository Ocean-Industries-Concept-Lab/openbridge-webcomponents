import { ref, computed, onMounted, onUnmounted } from 'vue'

// Maneuvering model in JavaScript for R/V Gunnerus (simplified 3-DOF)

// State: [u, v, r] - surge, sway, yaw
// Input: [X, Y, N] - forces/moments in surge, sway, and yaw
// Constants (example values from research and PMM tests)
const M = [
  [2.5e5, 0, 0], // M11 (mass + added mass in surge)
  [0, 3.2e5, 0], // M22 (mass + added mass in sway)
  [0, 0, 8.5e5] // M33 (mass + added mass in yaw)
]

const D = [
  [2e4, 0, 0], // D11 (linear damping in surge)
  [0, 2.5e4, 0], // D22 (linear damping in sway)
  [0, 0, 1.0e6] // D33 (linear damping in yaw)
]

// Time step (s)
const dt = 0.1

function inverse3x3(M: number[][]) {
  // Simple inversion of 3x3 diagonal matrix
  return [
    [1 / M[0][0], 0, 0],
    [0, 1 / M[1][1], 0],
    [0, 0, 1 / M[2][2]]
  ]
}

function multiplyMatrixVector(M: number[][], v: number[]) {
  return M.map((row) => row.reduce((sum, val, i) => sum + val * v[i], 0))
}

export function useVesselSim(initial?: {
  north?: number
  east?: number
  heading?: number
  u?: number
  v?: number
  r?: number
  current?: { direction?: number; directionRad?: number; speed: number } | [number, number]
}) {
  // Helper to convert current from direction/speed to [north, east] components
  function currentToVector(
    current:
      | { direction?: number; directionRad?: number; speed: number }
      | [number, number]
      | undefined
  ): [number, number] {
    if (!current) return [0, 0]
    if (Array.isArray(current)) return [...current]
    // direction: coming from (nautical, 0 = north, increasing clockwise)
    // We want the direction the current is going TO, so add 180 degrees
    let dirRad = current.directionRad
    if (typeof dirRad !== 'number' && typeof current.direction === 'number') {
      dirRad = (current.direction * Math.PI) / 180
    }
    if (typeof dirRad !== 'number') dirRad = 0
    // Current is coming FROM direction, so add 180 degrees
    const toDir = dirRad + Math.PI
    // North component = speed * cos(toDir), east component = speed * sin(toDir)
    return [current.speed * Math.cos(toDir), current.speed * Math.sin(toDir)]
  }

  // Reactive vessel state
  const u = ref(initial?.u ?? 0.0) // surge velocity (m/s)
  const v = ref(initial?.v ?? 0.0) // sway velocity (m/s)
  const r = ref(initial?.r ?? 0.0) // yaw rate (rad/s)

  // Position and heading
  const north = ref(initial?.north ?? 0.0) // North position (m)
  const east = ref(initial?.east ?? 0.0) // East position (m)
  const heading = ref(initial?.heading ?? 0.0) // Heading (rad)

  // Reactive input (forces/moments)
  const tau = ref([0, 0, 0])

  // Optionally, allow for water current in N/E (m/s)
  // current.value = [north, east] in m/s
  const current = ref(currentToVector(initial?.current))

  // Computed heading in degrees
  const headingDeg = computed(() => (heading.value * 180) / Math.PI)

  // Course over ground (COG)
  const courseOverGround = computed(() => {
    // Vessel velocity in N/E without current
    const psi = heading.value
    const Vn = u.value * Math.cos(psi) - v.value * Math.sin(psi)
    const Ve = u.value * Math.sin(psi) + v.value * Math.cos(psi)
    // Add current
    const Vn_total = Vn + current.value[0]
    const Ve_total = Ve + current.value[1]
    // atan2(Ve, Vn) gives direction in radians
    return Math.atan2(Ve_total, Vn_total)
  })
  const courseOverGroundDeg = computed(() => (courseOverGround.value * 180) / Math.PI)

  let intervalId: number | null = null

  function simulateStep() {
    const vel = [u.value, v.value, r.value]
    // Damping force
    const Dv = multiplyMatrixVector(D, vel)
    // Net force = input - damping
    const net = tau.value.map((t, i) => t - Dv[i])
    // Calculate acceleration
    const Minv = inverse3x3(M)
    const acc = multiplyMatrixVector(Minv, net)
    // Integrate with Euler (velocities)
    u.value += acc[0] * dt
    v.value += acc[1] * dt
    r.value += acc[2] * dt

    // Update heading (yaw angle)
    heading.value += r.value * dt

    // Calculate velocities in NED (North-East-Down) frame
    // Vessel velocities are in body frame (u: surge, v: sway)
    // N_dot = u*cos(psi) - v*sin(psi)
    // E_dot = u*sin(psi) + v*cos(psi)
    const psi = heading.value
    const north_dot = u.value * Math.cos(psi) - v.value * Math.sin(psi) + current.value[0]
    const east_dot = u.value * Math.sin(psi) + v.value * Math.cos(psi) + current.value[1]
    north.value += north_dot * dt
    east.value += east_dot * dt
  }

  onMounted(() => {
    intervalId = window.setInterval(simulateStep, dt * 1000)
  })

  onUnmounted(() => {
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  })

  // Optionally, expose a reset function
  function reset() {
    u.value = initial?.u ?? 0
    v.value = initial?.v ?? 0
    r.value = initial?.r ?? 0
    north.value = initial?.north ?? 0
    east.value = initial?.east ?? 0
    heading.value = initial?.heading ?? 0
    current.value = currentToVector(initial?.current)
  }

  return {
    u,
    v,
    r,
    north,
    east,
    heading,
    headingDeg,
    tau,
    current,
    reset,
    courseOverGround,
    courseOverGroundDeg
  }
}
