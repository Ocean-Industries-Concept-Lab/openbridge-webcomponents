import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiDiodes06Off as ObiDiodes06OffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-diodes-06-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-diodes-06-off.js';

@Component({
  selector: 'obi-diodes-06-off',
  template: '<ng-content></ng-content>',
})
export class ObiDiodes06Off {
  private _el: ObiDiodes06OffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiDiodes06OffElement>,
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

