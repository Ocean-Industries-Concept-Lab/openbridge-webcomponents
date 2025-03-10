import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiRangeRingsIec as ObiRangeRingsIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-range-rings-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-range-rings-iec.js';

@Component({
  selector: 'obi-range-rings-iec',
  template: '<ng-content></ng-content>',
})
export class ObiRangeRingsIec {
  private _el: ObiRangeRingsIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiRangeRingsIecElement>,
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

