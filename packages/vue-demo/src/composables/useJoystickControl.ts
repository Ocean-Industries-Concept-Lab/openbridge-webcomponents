import { ref, onMounted, onUnmounted } from 'vue'

export function useJoystickControl() {
  const x = ref(0)
  const y = ref(0)
  const gamepadConnected = ref(false)
  const KEY_STEP = 0.003 // step per key press/frame
  const AXIS_MIN = -1
  const AXIS_MAX = 1
  const keyState = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false }
  let animationFrameId: number | null = null
  let keyboardFrameId: number | null = null

  function pollGamepad() {
    const gamepads = navigator.getGamepads ? navigator.getGamepads() : []
    if (gamepads && gamepads[0]) {
      const gp = gamepads[0]
      if (gp && gp.axes.length >= 2) {
        x.value = Number(gp.axes[0].toFixed(2))
        y.value = Number(gp.axes[1].toFixed(2))
        gamepadConnected.value = true
      }
    } else {
      gamepadConnected.value = false
    }
    animationFrameId = requestAnimationFrame(pollGamepad)
  }

  function connectHandler() {
    gamepadConnected.value = true
    pollGamepad()
  }

  function disconnectHandler() {
    gamepadConnected.value = false
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = null
    }
  }

  function clamp(val: number, min: number, max: number) {
    return Math.max(min, Math.min(max, val))
  }

  function keyboardLoop() {
    // Only update if no gamepad is connected
    if (!gamepadConnected.value) {
      // Up increases x, Down decreases x
      if (keyState.ArrowUp) x.value = clamp(x.value + KEY_STEP, AXIS_MIN, AXIS_MAX)
      if (keyState.ArrowDown) x.value = clamp(x.value - KEY_STEP, AXIS_MIN, AXIS_MAX)
      // Right increases y, Left decreases y
      if (keyState.ArrowRight) y.value = clamp(y.value + KEY_STEP, AXIS_MIN, AXIS_MAX)
      if (keyState.ArrowLeft) y.value = clamp(y.value - KEY_STEP, AXIS_MIN, AXIS_MAX)
    }
    keyboardFrameId = requestAnimationFrame(keyboardLoop)
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key in keyState) {
      keyState[e.key as keyof typeof keyState] = true
      e.preventDefault()
    }
  }
  function handleKeyUp(e: KeyboardEvent) {
    if (e.key in keyState) {
      keyState[e.key as keyof typeof keyState] = false
      e.preventDefault()
    }
  }

  onMounted(() => {
    window.addEventListener('gamepadconnected', connectHandler)
    window.addEventListener('gamepaddisconnected', disconnectHandler)
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    pollGamepad()
    keyboardLoop()
  })

  onUnmounted(() => {
    window.removeEventListener('gamepadconnected', connectHandler)
    window.removeEventListener('gamepaddisconnected', disconnectHandler)
    window.removeEventListener('keydown', handleKeyDown)
    window.removeEventListener('keyup', handleKeyUp)
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId)
    }
    if (keyboardFrameId) {
      cancelAnimationFrame(keyboardFrameId)
    }
  })

  return { x, y, gamepadConnected }
} 