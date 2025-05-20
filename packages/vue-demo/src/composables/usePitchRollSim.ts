import { ref, onMounted, onUnmounted, type Ref } from 'vue';

export interface PitchRollSim {
  pitch: Ref<number>
  roll: Ref<number>
}

/**
 * Simulates pitch and roll as oscillating values, each with their own period and max angle, and an initial delta angle between them.
 * @param pitchConfig { periodSeconds: number, maxAngle: number }
 * @param rollConfig { periodSeconds: number, maxAngle: number }
 * @param initialDeltaAngle Initial phase offset between pitch and roll, in degrees.
 * @returns Reactive pitch and roll refs.
 */
export function usePitchRollSim(
    config: {
        pitch: { periodSeconds: number; maxAngle: number },
        roll: { periodSeconds: number; maxAngle: number },
        initialDeltaAngle: number
    }
): PitchRollSim {
  const pitch = ref(0);
  const roll = ref(0);
  let animationFrameId: number | null = null;
  let startTime: number | null = null;
  const { pitch: pitchConfig, roll: rollConfig, initialDeltaAngle } = config;

  // Convert initial delta angle to radians for phase offset
  const deltaRad = (initialDeltaAngle * Math.PI) / 180;

  const update = (now: number) => {
    if (startTime === null) startTime = now;
    const elapsed = (now - startTime) / 1000; // seconds
    const omegaPitch = (2 * Math.PI) / pitchConfig.periodSeconds;
    const omegaRoll = (2 * Math.PI) / rollConfig.periodSeconds;
    pitch.value = Math.sin(omegaPitch * elapsed) * pitchConfig.maxAngle;
    roll.value = Math.cos(omegaRoll * elapsed + deltaRad) * rollConfig.maxAngle;
    animationFrameId = requestAnimationFrame(update);
  };

  onMounted(() => {
    animationFrameId = requestAnimationFrame(update);
  });

  onUnmounted(() => {
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
    }
  });

  return { pitch, roll };
}
