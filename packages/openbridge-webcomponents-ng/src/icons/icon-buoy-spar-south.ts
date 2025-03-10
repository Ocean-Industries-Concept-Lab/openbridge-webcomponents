import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoySparSouth as ObiBuoySparSouthElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-spar-south.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-spar-south.js';

@Component({
  selector: 'obi-buoy-spar-south',
  template: '<ng-content></ng-content>',
})
export class ObiBuoySparSouth {
  private _el: ObiBuoySparSouthElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoySparSouthElement>,
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

