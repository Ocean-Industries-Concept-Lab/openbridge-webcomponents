import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSwell as ObiSwellElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-swell.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-swell.js';

@Component({
  selector: 'obi-swell',
  template: '<ng-content></ng-content>',
})
export class ObiSwell {
  private _el: ObiSwellElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSwellElement>,
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

