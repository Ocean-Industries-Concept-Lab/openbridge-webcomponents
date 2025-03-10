import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiThreewayDigitalOpen as ObiThreewayDigitalOpenElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-digital-open.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-digital-open.js';

@Component({
  selector: 'obi-threeway-digital-open',
  template: '<ng-content></ng-content>',
})
export class ObiThreewayDigitalOpen {
  private _el: ObiThreewayDigitalOpenElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiThreewayDigitalOpenElement>,
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

