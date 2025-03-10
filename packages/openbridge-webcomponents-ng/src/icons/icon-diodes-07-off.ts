import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiDiodes07Off as ObiDiodes07OffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-diodes-07-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-diodes-07-off.js';

@Component({
  selector: 'obi-diodes-07-off',
  template: '<ng-content></ng-content>',
})
export class ObiDiodes07Off {
  private _el: ObiDiodes07OffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiDiodes07OffElement>,
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

