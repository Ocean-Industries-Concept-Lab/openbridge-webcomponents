import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoyPilarConeDown as ObiBuoyPilarConeDownElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-pilar-cone-down.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-pilar-cone-down.js';

@Component({
  selector: 'obi-buoy-pilar-cone-down',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBuoyPilarConeDown {
  private _el: ObiBuoyPilarConeDownElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoyPilarConeDownElement>,
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

