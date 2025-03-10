import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBipolar_transistor04Off as ObiBipolar_transistor04OffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-bipolar_transistor-04-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-bipolar_transistor-04-off.js';

@Component({
  selector: 'obi-bipolar_transistor-04-off',
  template: '<ng-content></ng-content>',
})
export class ObiBipolar_transistor04Off {
  private _el: ObiBipolar_transistor04OffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBipolar_transistor04OffElement>,
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

