import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiDiodes05Off as ObiDiodes05OffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-diodes-05-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-diodes-05-off.js';

@Component({
  selector: 'obi-diodes-05-off',
  template: '<ng-content></ng-content>',
})
export class ObiDiodes05Off {
  private _el: ObiDiodes05OffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiDiodes05OffElement>,
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

