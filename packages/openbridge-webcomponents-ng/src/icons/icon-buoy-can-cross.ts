import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoyCanCross as ObiBuoyCanCrossElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-can-cross.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-can-cross.js';

@Component({
  selector: 'obi-buoy-can-cross',
  template: '<ng-content></ng-content>',
})
export class ObiBuoyCanCross {
  private _el: ObiBuoyCanCrossElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoyCanCrossElement>,
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

