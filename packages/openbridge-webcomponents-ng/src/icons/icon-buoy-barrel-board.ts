import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoyBarrelBoard as ObiBuoyBarrelBoardElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-barrel-board.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-barrel-board.js';

@Component({
  selector: 'obi-buoy-barrel-board',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBuoyBarrelBoard {
  private _el: ObiBuoyBarrelBoardElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoyBarrelBoardElement>,
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

