import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSpeedHigh as ObiSpeedHighElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-speed-high.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-speed-high.js';

@Component({
  selector: 'obi-speed-high',
  template: '<ng-content></ng-content>',
})
export class ObiSpeedHigh {
  private _el: ObiSpeedHighElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSpeedHighElement>,
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

