import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoyConicalBoard as ObiBuoyConicalBoardElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-conical-board.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-conical-board.js';

@Component({
  selector: 'obi-buoy-conical-board',
  template: '<ng-content></ng-content>',
})
export class ObiBuoyConicalBoard {
  private _el: ObiBuoyConicalBoardElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoyConicalBoardElement>,
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

