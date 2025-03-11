import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiWireThreeway as ObiWireThreewayElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wire-threeway.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wire-threeway.js';

@Component({
  selector: 'obi-wire-threeway',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiWireThreeway {
  private _el: ObiWireThreewayElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiWireThreewayElement>,
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

