import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCellBad as ObiCellBadElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cell-bad.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cell-bad.js';

@Component({
  selector: 'obi-cell-bad',
  template: '<ng-content></ng-content>',
})
export class ObiCellBad {
  private _el: ObiCellBadElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCellBadElement>,
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

