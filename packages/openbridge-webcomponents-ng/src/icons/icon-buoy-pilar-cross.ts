import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoyPilarCross as ObiBuoyPilarCrossElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-pilar-cross.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-pilar-cross.js';

@Component({
  selector: 'obi-buoy-pilar-cross',
  template: '<ng-content></ng-content>',
})
export class ObiBuoyPilarCross {
  private _el: ObiBuoyPilarCrossElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoyPilarCrossElement>,
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

