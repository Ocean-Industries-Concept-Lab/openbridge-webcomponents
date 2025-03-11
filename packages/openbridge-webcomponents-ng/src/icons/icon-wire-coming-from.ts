import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiWireComingFrom as ObiWireComingFromElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wire-coming-from.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wire-coming-from.js';

@Component({
  selector: 'obi-wire-coming-from',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiWireComingFrom {
  private _el: ObiWireComingFromElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiWireComingFromElement>,
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

