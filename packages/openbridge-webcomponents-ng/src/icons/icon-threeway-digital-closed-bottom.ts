import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiThreewayDigitalClosedBottom as ObiThreewayDigitalClosedBottomElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-digital-closed-bottom.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-digital-closed-bottom.js';

@Component({
  selector: 'obi-threeway-digital-closed-bottom',
  template: '<ng-content></ng-content>',
})
export class ObiThreewayDigitalClosedBottom {
  private _el: ObiThreewayDigitalClosedBottomElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiThreewayDigitalClosedBottomElement>,
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

