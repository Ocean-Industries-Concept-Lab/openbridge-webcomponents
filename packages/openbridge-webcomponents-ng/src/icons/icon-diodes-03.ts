import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiDiodes03 as ObiDiodes03Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-diodes-03.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-diodes-03.js';

@Component({
  selector: 'obi-diodes-03',
  template: '<ng-content></ng-content>',
})
export class ObiDiodes03 {
  private _el: ObiDiodes03Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiDiodes03Element>,
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

