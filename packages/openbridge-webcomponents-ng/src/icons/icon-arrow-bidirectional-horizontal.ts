import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiArrowBidirectionalHorizontal as ObiArrowBidirectionalHorizontalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-arrow-bidirectional-horizontal.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-arrow-bidirectional-horizontal.js';

@Component({
  selector: 'obi-arrow-bidirectional-horizontal',
  template: '<ng-content></ng-content>',
})
export class ObiArrowBidirectionalHorizontal {
  private _el: ObiArrowBidirectionalHorizontalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiArrowBidirectionalHorizontalElement>,
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

