import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiForwardFast as ObiForwardFastElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-forward-fast.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-forward-fast.js';

@Component({
  selector: 'obi-forward-fast',
  template: '<ng-content></ng-content>',
})
export class ObiForwardFast {
  private _el: ObiForwardFastElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiForwardFastElement>,
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

