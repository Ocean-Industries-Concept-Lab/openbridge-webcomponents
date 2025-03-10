import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiPrintScreenIec as ObiPrintScreenIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-print-screen-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-print-screen-iec.js';

@Component({
  selector: 'obi-print-screen-iec',
  template: '<ng-content></ng-content>',
})
export class ObiPrintScreenIec {
  private _el: ObiPrintScreenIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiPrintScreenIecElement>,
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

