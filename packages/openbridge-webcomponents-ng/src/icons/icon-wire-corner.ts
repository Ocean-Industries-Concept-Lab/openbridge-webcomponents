import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiWireCorner as ObiWireCornerElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wire-corner.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wire-corner.js';

@Component({
  selector: 'obi-wire-corner',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiWireCorner {
  private _el: ObiWireCornerElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiWireCornerElement>,
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

