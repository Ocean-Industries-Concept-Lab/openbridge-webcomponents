import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSatelliteFull as ObiSatelliteFullElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-satellite-full.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-satellite-full.js';

@Component({
  selector: 'obi-satellite-full',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiSatelliteFull {
  private _el: ObiSatelliteFullElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSatelliteFullElement>,
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

