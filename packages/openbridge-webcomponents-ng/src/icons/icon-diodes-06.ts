import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiDiodes06 as ObiDiodes06Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-diodes-06.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-diodes-06.js';

@Component({
  selector: 'obi-diodes-06',
  template: '<ng-content></ng-content>',
})
export class ObiDiodes06 {
  private _el: ObiDiodes06Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiDiodes06Element>,
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

