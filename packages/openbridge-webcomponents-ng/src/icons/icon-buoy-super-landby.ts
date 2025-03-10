import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoySuperLandby as ObiBuoySuperLandbyElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-super-landby.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-super-landby.js';

@Component({
  selector: 'obi-buoy-super-landby',
  template: '<ng-content></ng-content>',
})
export class ObiBuoySuperLandby {
  private _el: ObiBuoySuperLandbyElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoySuperLandbyElement>,
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

