import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSatelliteLow as ObiSatelliteLowElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-satellite-low.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-satellite-low.js';

@Component({
  selector: 'obi-satellite-low',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiSatelliteLow {
  private _el: ObiSatelliteLowElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSatelliteLowElement>,
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

