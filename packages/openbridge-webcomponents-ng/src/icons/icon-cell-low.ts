import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCellLow as ObiCellLowElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cell-low.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cell-low.js';

@Component({
  selector: 'obi-cell-low',
  template: '<ng-content></ng-content>',
})
export class ObiCellLow {
  private _el: ObiCellLowElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCellLowElement>,
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

