import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoyMooringCan as ObiBuoyMooringCanElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-mooring-can.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-mooring-can.js';

@Component({
  selector: 'obi-buoy-mooring-can',
  template: '<ng-content></ng-content>',
})
export class ObiBuoyMooringCan {
  private _el: ObiBuoyMooringCanElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoyMooringCanElement>,
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

