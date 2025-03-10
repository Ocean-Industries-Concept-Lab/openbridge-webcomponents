import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiDiodes01 as ObiDiodes01Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-diodes-01.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-diodes-01.js';

@Component({
  selector: 'obi-diodes-01',
  template: '<ng-content></ng-content>',
})
export class ObiDiodes01 {
  private _el: ObiDiodes01Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiDiodes01Element>,
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

