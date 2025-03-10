import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSpeedLow as ObiSpeedLowElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-speed-low.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-speed-low.js';

@Component({
  selector: 'obi-speed-low',
  template: '<ng-content></ng-content>',
})
export class ObiSpeedLow {
  private _el: ObiSpeedLowElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSpeedLowElement>,
    ngZone: NgZone
  ) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
    
  }

  
  @Input()
  set useCssColor(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.useCssColor = v));
  }

  get useCssColor() {
    return this._el.useCssColor;
  }
  

  
}

