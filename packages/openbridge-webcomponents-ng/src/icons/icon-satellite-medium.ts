import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSatelliteMedium as ObiSatelliteMediumElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-satellite-medium.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-satellite-medium.js';

@Component({
  selector: 'obi-satellite-medium',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiSatelliteMedium {
  private _el: ObiSatelliteMediumElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSatelliteMediumElement>,
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

