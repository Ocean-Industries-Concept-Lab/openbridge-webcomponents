import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObcCompassFlat as ObcCompassFlatElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/compass-flat/compass-flat.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/compass-flat/compass-flat.js';

@Component({
  selector: 'obc-compass-flat',
  template: '<ng-content></ng-content>',
})
export class ObcCompassFlat {
  private _el: ObcCompassFlatElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcCompassFlatElement>,
    ngZone: NgZone
  ) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
    
  }

  
  @Input()
  set noPadding(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.noPadding = v));
  }

  get noPadding() {
    return this._el.noPadding;
  }
  
  @Input()
  set FOVIndicator(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.FOVIndicator = v));
  }

  get FOVIndicator() {
    return this._el.FOVIndicator;
  }
  
  @Input()
  set padding(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.padding = v));
  }

  get padding() {
    return this._el.padding;
  }
  
  @Input()
  set heading(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.heading = v));
  }

  get heading() {
    return this._el.heading;
  }
  
  @Input()
  set courseOverGround(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.courseOverGround = v));
  }

  get courseOverGround() {
    return this._el.courseOverGround;
  }
  
  @Input()
  set tickInterval(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.tickInterval = v));
  }

  get tickInterval() {
    return this._el.tickInterval;
  }
  
  @Input()
  set FOV(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.FOV = v));
  }

  get FOV() {
    return this._el.FOV;
  }
  
  @Input()
  set minFOV(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.minFOV = v));
  }

  get minFOV() {
    return this._el.minFOV;
  }
  
  @Input()
  set maxFOV(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.maxFOV = v));
  }

  get maxFOV() {
    return this._el.maxFOV;
  }
  

  
}

