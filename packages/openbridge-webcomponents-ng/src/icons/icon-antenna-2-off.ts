import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAntenna2Off as ObiAntenna2OffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-antenna-2-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-antenna-2-off.js';

@Component({
  selector: 'obi-antenna-2-off',
  template: '<ng-content></ng-content>',
})
export class ObiAntenna2Off {
  private _el: ObiAntenna2OffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAntenna2OffElement>,
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

