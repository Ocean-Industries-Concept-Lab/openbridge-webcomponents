/**
 * Animation utilities for POI group expand/collapse animations
 */

/**
 * Easing function for smooth animations
 * @param progress - Animation progress from 0 to 1
 * @returns Eased value
 */
export function easeInOutQuad(progress: number): number {
  return progress < 0.5
    ? 2 * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 2) / 2;
}

/**
 * Interface for animation config
 */
export interface AnimationConfig {
  duration: number;
  onUpdate: (progress: number) => void;
  onComplete?: () => void;
  onError?: (error: Error) => void;
}

/**
 * Animation manager for requestAnimationFrame-based animations
 */
export class AnimationManager {
  private animationId: number | null = null;
  private startTime = 0;
  private startProgress = 0;

  /**
   * Start a new animation
   * @param targetProgress - Target progress value (0-1)
   * @param fromProgress - Starting progress value (0-1)
   * @param config - Animation configuration
   */
  start(
    targetProgress: number,
    fromProgress: number,
    config: AnimationConfig
  ): void {
    this.cancel();
    this.startTime = performance.now();
    this.startProgress = fromProgress;

    const step = (now: number) => {
      try {
        const elapsed = now - this.startTime;
        const t =
          config.duration <= 0 ? 1 : Math.min(elapsed / config.duration, 1);
        const currentProgress =
          this.startProgress + (targetProgress - this.startProgress) * t;

        config.onUpdate(currentProgress);

        if (t >= 1) {
          this.animationId = null;
          config.onComplete?.();
        } else {
          this.animationId = requestAnimationFrame(step);
        }
      } catch (error) {
        this.animationId = null;
        config.onError?.(error as Error);
      }
    };

    this.animationId = requestAnimationFrame(step);
  }

  /**
   * Cancel the current animation
   */
  cancel(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  /**
   * Check if animation is running
   */
  isRunning(): boolean {
    return this.animationId !== null;
  }
}

/**
 * Lerp (linear interpolation) between two values
 */
export function lerp(from: number, to: number, t: number): number {
  return from + (to - from) * t;
}

/**
 * Smooth step interpolation with configurable speed
 */
export function smoothStep(
  current: number,
  to: number,
  speed: number = 0.1
): number {
  const diff = to - current;
  if (Math.abs(diff) < 0.5) {
    return to;
  }
  return current + diff * speed;
}
