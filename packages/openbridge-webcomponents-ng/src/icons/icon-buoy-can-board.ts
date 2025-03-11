import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoyCanBoard as ObiBuoyCanBoardElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-can-board.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-can-board.js';

@Component({
  selector: 'obi-buoy-can-board',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBuoyCanBoard {
  private _el: ObiBuoyCanBoardElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoyCanBoardElement>,
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

