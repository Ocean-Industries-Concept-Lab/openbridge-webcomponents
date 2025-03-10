import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiThreewayDigitalClosedLeft as ObiThreewayDigitalClosedLeftElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-digital-closed-left.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-digital-closed-left.js';

@Component({
  selector: 'obi-threeway-digital-closed-left',
  template: '<ng-content></ng-content>',
})
export class ObiThreewayDigitalClosedLeft {
  private _el: ObiThreewayDigitalClosedLeftElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiThreewayDigitalClosedLeftElement>,
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

