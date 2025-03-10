import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoyCanSouth as ObiBuoyCanSouthElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-can-south.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-can-south.js';

@Component({
  selector: 'obi-buoy-can-south',
  template: '<ng-content></ng-content>',
})
export class ObiBuoyCanSouth {
  private _el: ObiBuoyCanSouthElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoyCanSouthElement>,
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

