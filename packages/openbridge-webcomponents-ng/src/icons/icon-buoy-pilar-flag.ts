import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoyPilarFlag as ObiBuoyPilarFlagElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-pilar-flag.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-pilar-flag.js';

@Component({
  selector: 'obi-buoy-pilar-flag',
  template: '<ng-content></ng-content>',
})
export class ObiBuoyPilarFlag {
  private _el: ObiBuoyPilarFlagElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoyPilarFlagElement>,
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

