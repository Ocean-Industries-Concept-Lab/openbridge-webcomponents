import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCellOff as ObiCellOffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cell-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cell-off.js';

@Component({
  selector: 'obi-cell-off',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiCellOff {
  private _el: ObiCellOffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCellOffElement>,
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

