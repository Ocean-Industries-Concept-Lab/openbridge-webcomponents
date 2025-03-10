import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiArrowBidirectionalDiagonal as ObiArrowBidirectionalDiagonalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-arrow-bidirectional-diagonal.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-arrow-bidirectional-diagonal.js';

@Component({
  selector: 'obi-arrow-bidirectional-diagonal',
  template: '<ng-content></ng-content>',
})
export class ObiArrowBidirectionalDiagonal {
  private _el: ObiArrowBidirectionalDiagonalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiArrowBidirectionalDiagonalElement>,
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

