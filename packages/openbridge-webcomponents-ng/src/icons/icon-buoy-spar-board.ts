import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoySparBoard as ObiBuoySparBoardElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-spar-board.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-spar-board.js';

@Component({
  selector: 'obi-buoy-spar-board',
  template: '<ng-content></ng-content>',
})
export class ObiBuoySparBoard {
  private _el: ObiBuoySparBoardElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoySparBoardElement>,
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

