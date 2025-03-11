import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiThreewayDigitalClosedRight as ObiThreewayDigitalClosedRightElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-digital-closed-right.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-digital-closed-right.js';

@Component({
  selector: 'obi-threeway-digital-closed-right',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiThreewayDigitalClosedRight {
  private _el: ObiThreewayDigitalClosedRightElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiThreewayDigitalClosedRightElement>,
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

