import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoyCanWest as ObiBuoyCanWestElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-can-west.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-can-west.js';

@Component({
  selector: 'obi-buoy-can-west',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBuoyCanWest {
  private _el: ObiBuoyCanWestElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoyCanWestElement>,
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

