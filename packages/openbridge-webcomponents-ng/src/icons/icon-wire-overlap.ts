import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiWireOverlap as ObiWireOverlapElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wire-overlap.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wire-overlap.js';

@Component({
  selector: 'obi-wire-overlap',
  template: '<ng-content></ng-content>',
})
export class ObiWireOverlap {
  private _el: ObiWireOverlapElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiWireOverlapElement>,
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

