import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoyPilarBoard as ObiBuoyPilarBoardElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-pilar-board.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-pilar-board.js';

@Component({
  selector: 'obi-buoy-pilar-board',
  template: '<ng-content></ng-content>',
})
export class ObiBuoyPilarBoard {
  private _el: ObiBuoyPilarBoardElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoyPilarBoardElement>,
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

