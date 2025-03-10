import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoyConicalDanger as ObiBuoyConicalDangerElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-conical-danger.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-conical-danger.js';

@Component({
  selector: 'obi-buoy-conical-danger',
  template: '<ng-content></ng-content>',
})
export class ObiBuoyConicalDanger {
  private _el: ObiBuoyConicalDangerElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoyConicalDangerElement>,
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

