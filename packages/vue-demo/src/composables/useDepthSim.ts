import { computed } from 'vue';
import type { Ref } from 'vue';

/**
 * Simulates seabed depth using a sum of 10 sine functions with different amplitude, periods (north/east), and phase.
 * @param north Ref<number> - North coordinate in meters
 * @param east Ref<number> - East coordinate in meters
 * @returns ComputedRef<number> - Depth in meters (10-50m)
 */
export function useDepthSim(north: Ref<number>, east: Ref<number>) {
  // Parameters for 10 sine waves: [amplitude, periodN, periodE, phase]
  const waves = [
    [8,   50,  70, 0.0],
    [6,  120,  90, 1.2],
    [4,   80, 150, 2.1],
    [3,   30,  60, 0.5],
    [2,  200,  40, 2.8],
    [5,  100,  80, 1.7],
    [2.5, 60, 120, 0.9],
    [1.5,150,  50, 2.3],
    [3.5, 70,  30, 1.4],
    [4.5, 90, 100, 2.6],
  ];

  const depth = computed(() => {
    let sum = 0;
    for (const [amp, periodN, periodE, phase] of waves) {
      sum += amp * Math.sin((north.value / periodN) + (east.value / periodE) + phase);
    }
    // Normalize sum to [0, 1]
    const maxSum = waves.reduce((acc, w) => acc + Math.abs(w[0]), 0);
    const normalized = (sum + maxSum) / (2 * maxSum); // [0,1]
    // Scale to [5, 25] meters
    return 5 + normalized * 20;
  });

  return depth;
}
