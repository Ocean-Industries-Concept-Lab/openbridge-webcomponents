import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCellFull as ObiCellFullElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cell-full.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cell-full.js';

@Component({
  selector: 'obi-cell-full',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiCellFull {
  private _el: ObiCellFullElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCellFullElement>,
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

