import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTwowayDigitalStatic as ObiTwowayDigitalStaticElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-twoway-digital-static.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-twoway-digital-static.js';

@Component({
  selector: 'obi-twoway-digital-static',
  template: '<ng-content></ng-content>',
})
export class ObiTwowayDigitalStatic {
  private _el: ObiTwowayDigitalStaticElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTwowayDigitalStaticElement>,
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

