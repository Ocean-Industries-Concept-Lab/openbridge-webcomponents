import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiWireGoingTo as ObiWireGoingToElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wire-going-to.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wire-going-to.js';

@Component({
  selector: 'obi-wire-going-to',
  template: '<ng-content></ng-content>',
})
export class ObiWireGoingTo {
  private _el: ObiWireGoingToElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiWireGoingToElement>,
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

