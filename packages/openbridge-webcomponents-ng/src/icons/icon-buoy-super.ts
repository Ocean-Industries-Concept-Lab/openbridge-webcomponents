import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoySuper as ObiBuoySuperElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-super.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-super.js';

@Component({
  selector: 'obi-buoy-super',
  template: '<ng-content></ng-content>',
})
export class ObiBuoySuper {
  private _el: ObiBuoySuperElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoySuperElement>,
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

