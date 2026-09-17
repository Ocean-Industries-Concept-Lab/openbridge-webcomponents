import type {LitElement, ReactiveController} from 'lit';
import {
  FlashingSpeed,
  type FlashTempo,
  type ResolvedFlashingSpeed,
} from '../types.js';
import {installFlashing} from './blinking.js';

/**
 * Keeps one flash animation on the host in step with the tempo the host
 * resolves after every update. `fixed` or a disconnect removes it; a
 * reconnect re-syncs without waiting for a property change (#1224).
 */
export class FlashingController implements ReactiveController {
  private cancel?: () => void;
  private installed?: FlashTempo;

  constructor(
    private readonly host: LitElement,
    private readonly resolve: () => ResolvedFlashingSpeed
  ) {
    host.addController(this);
  }

  get tempo(): FlashTempo | undefined {
    return this.installed;
  }

  hostConnected(): void {
    if (this.host.hasUpdated) {
      this.sync();
    }
  }

  hostUpdated(): void {
    this.sync();
  }

  hostDisconnected(): void {
    this.stop();
  }

  private sync(): void {
    const wanted = this.host.isConnected ? this.resolve() : FlashingSpeed.Fixed;
    if (wanted === FlashingSpeed.Fixed) {
      this.stop();
      return;
    }
    if (wanted === this.installed) {
      return;
    }
    this.stop();
    this.cancel = installFlashing(this.host, wanted);
    this.installed = wanted;
  }

  private stop(): void {
    this.cancel?.();
    this.cancel = undefined;
    this.installed = undefined;
  }
}
