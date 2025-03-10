import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTwowayDigitalNonReturn as ObiTwowayDigitalNonReturnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-twoway-digital-non-return.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-twoway-digital-non-return.js';

@Component({
  selector: 'obi-twoway-digital-non-return',
  template: '<ng-content></ng-content>',
})
export class ObiTwowayDigitalNonReturn {
  private _el: ObiTwowayDigitalNonReturnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTwowayDigitalNonReturnElement>,
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

