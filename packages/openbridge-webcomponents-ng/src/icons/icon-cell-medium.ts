import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCellMedium as ObiCellMediumElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cell-medium.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cell-medium.js';

@Component({
  selector: 'obi-cell-medium',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiCellMedium {
  private _el: ObiCellMediumElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCellMediumElement>,
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

