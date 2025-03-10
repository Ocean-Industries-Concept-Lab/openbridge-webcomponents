import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoyCanDanger as ObiBuoyCanDangerElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-can-danger.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-can-danger.js';

@Component({
  selector: 'obi-buoy-can-danger',
  template: '<ng-content></ng-content>',
})
export class ObiBuoyCanDanger {
  private _el: ObiBuoyCanDangerElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoyCanDangerElement>,
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

