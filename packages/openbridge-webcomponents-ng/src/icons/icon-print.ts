import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiPrint as ObiPrintElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-print.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-print.js';

@Component({
  selector: 'obi-print',
  template: '<ng-content></ng-content>',
})
export class ObiPrint {
  private _el: ObiPrintElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiPrintElement>,
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

