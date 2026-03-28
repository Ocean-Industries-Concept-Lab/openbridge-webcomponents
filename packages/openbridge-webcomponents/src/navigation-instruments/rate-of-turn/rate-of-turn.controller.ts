// spinner-controller.ts
import {ReactiveController, ReactiveControllerHost} from 'lit';

export class RateOfTurnController implements ReactiveController {
  private host: ReactiveControllerHost;
  readonly el: Element;
  private animation?: Animation;
  private _rotationsPerMinute = 1;

  constructor(
    host: ReactiveControllerHost,
    el: Element,
    initialRotationsPerMinute = 1
  ) {
    this.host = host;
    this.el = el;
    this._rotationsPerMinute = initialRotationsPerMinute;
    this.host.addController(this);
  }

  set rotationsPerMinute(value: number) {
    if (this._rotationsPerMinute !== value) {
      this._rotationsPerMinute = value;
      this.updateAnimation();
    }
  }

  get rotationsPerMinute() {
    return this._rotationsPerMinute;
  }

  hostConnected() {
    this.startAnimation();
  }

  private startAnimation() {
    const absSpeed = Math.abs(this._rotationsPerMinute);
    const duration = absSpeed === 0 ? 1 : (1000 * 60) / absSpeed;

    this.animation = this.el.animate(
      [{transform: 'rotate(0deg)'}, {transform: 'rotate(360deg)'}],
      {
        duration,
        iterations: Infinity,
        direction: this._rotationsPerMinute >= 0 ? 'normal' : 'reverse',
      }
    );

    if (this._rotationsPerMinute === 0) {
      this.animation.pause();
    }
  }

  private updateAnimation() {
    if (!this.animation) return;

    const currentTiming = this.animation.effect!.getComputedTiming();
    const oldDuration = currentTiming.duration as number;
    const currentTime = (this.animation.currentTime as number) ?? 0;
    const oldDirection = currentTiming.direction;
    const progress = (currentTime % oldDuration) / oldDuration;

    this.animation.cancel();

    const absSpeed = Math.abs(this._rotationsPerMinute);
    const newDuration = absSpeed === 0 ? 1 : (1000 * 60) / absSpeed;
    const newDirection = this._rotationsPerMinute >= 0 ? 'normal' : 'reverse';

    const correctedProgress =
      oldDirection !== newDirection ? 1 - progress : progress;

    this.animation = this.el.animate(
      [{transform: 'rotate(0deg)'}, {transform: 'rotate(360deg)'}],
      {
        duration: newDuration,
        iterations: Infinity,
        direction: newDirection,
      }
    );

    this.animation.currentTime = correctedProgress * newDuration;

    if (this._rotationsPerMinute === 0) {
      this.animation.pause();
    }
  }

  destroy() {
    this.animation?.cancel();
    this.animation = undefined;
  }

  hostDisconnected() {
    this.destroy();
  }
}
