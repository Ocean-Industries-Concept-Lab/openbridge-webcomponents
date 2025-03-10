import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiInputUp as ObiInputUpElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-input-up.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-input-up.js';

@Component({
  selector: 'obi-input-up',
  template: '<ng-content></ng-content>',
})
export class ObiInputUp {
  private _el: ObiInputUpElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiInputUpElement>,
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

