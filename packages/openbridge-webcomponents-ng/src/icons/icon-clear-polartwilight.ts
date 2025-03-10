import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiClearPolartwilight as ObiClearPolartwilightElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-clear-polartwilight.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-clear-polartwilight.js';

@Component({
  selector: 'obi-clear-polartwilight',
  template: '<ng-content></ng-content>',
})
export class ObiClearPolartwilight {
  private _el: ObiClearPolartwilightElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiClearPolartwilightElement>,
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

