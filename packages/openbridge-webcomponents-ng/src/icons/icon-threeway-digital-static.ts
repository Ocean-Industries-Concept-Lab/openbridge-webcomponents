import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiThreewayDigitalStatic as ObiThreewayDigitalStaticElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-digital-static.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-digital-static.js';

@Component({
  selector: 'obi-threeway-digital-static',
  template: '<ng-content></ng-content>',
})
export class ObiThreewayDigitalStatic {
  private _el: ObiThreewayDigitalStaticElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiThreewayDigitalStaticElement>,
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

