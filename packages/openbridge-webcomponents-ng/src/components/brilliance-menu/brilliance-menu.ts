import {
  Component,
  ElementRef,
  NgZone,
  Input,
  EventEmitter,
  Output,
  CUSTOM_ELEMENTS_SCHEMA,
} from "@angular/core";

import { ObcPalette } from "@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/brilliance-menu/brilliance-menu.js";
export type { ObcPalette } from "@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/brilliance-menu/brilliance-menu.js";
import type { ObcBrillianceMenu as ObcBrillianceMenuElement } from "@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/brilliance-menu/brilliance-menu.js";
import "@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/brilliance-menu/brilliance-menu.js";

@Component({
  selector: "obc-brilliance-menu",
  template: "<obc-brilliance-menu></obc-brilliance-menu>",
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ObcBrillianceMenu {
  private _el: ObcBrillianceMenuElement;
  private _ngZone: NgZone;

  constructor(e: ElementRef<ObcBrillianceMenuElement>, ngZone: NgZone) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;

    this._el.addEventListener("palette-changed", (e: Event) => {
      // TODO(justinfagnani): we need to let the element say how to get a value
      // from an event, ex: e.value
      this.paletteChangedEvent.emit(e);
    });

    this._el.addEventListener("brightness-changed", (e: Event) => {
      // TODO(justinfagnani): we need to let the element say how to get a value
      // from an event, ex: e.value
      this.brightnessChangedEvent.emit(e);
    });
  }

  @Input()
  set palette(v: ObcPalette) {
    this._ngZone.runOutsideAngular(() => (this._el.palette = v));
  }

  get palette() {
    return this._el.palette;
  }

  @Input()
  set brightness(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.brightness = v));
  }

  get brightness() {
    return this._el.brightness;
  }

  @Input()
  set showAutoBrightness(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.showAutoBrightness = v));
  }

  get showAutoBrightness() {
    return this._el.showAutoBrightness;
  }

  @Input()
  set showAutoPalette(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.showAutoPalette = v));
  }

  get showAutoPalette() {
    return this._el.showAutoPalette;
  }

  @Input()
  set hideBrightness(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.hideBrightness = v));
  }

  get hideBrightness() {
    return this._el.hideBrightness;
  }

  @Output()
  paletteChangedEvent = new EventEmitter<unknown>();

  @Output()
  brightnessChangedEvent = new EventEmitter<unknown>();
}
