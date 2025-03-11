import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoyPilarConeUp as ObiBuoyPilarConeUpElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-pilar-cone-up.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-pilar-cone-up.js';

@Component({
  selector: 'obi-buoy-pilar-cone-up',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBuoyPilarConeUp {
  private _el: ObiBuoyPilarConeUpElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoyPilarConeUpElement>,
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

