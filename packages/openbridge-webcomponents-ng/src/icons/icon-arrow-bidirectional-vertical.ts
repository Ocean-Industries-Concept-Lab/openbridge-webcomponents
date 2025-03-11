import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiArrowBidirectionalVertical as ObiArrowBidirectionalVerticalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-arrow-bidirectional-vertical.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-arrow-bidirectional-vertical.js';

@Component({
  selector: 'obi-arrow-bidirectional-vertical',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiArrowBidirectionalVertical {
  private _el: ObiArrowBidirectionalVerticalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiArrowBidirectionalVerticalElement>,
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

