import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBipolar_transistor03 as ObiBipolar_transistor03Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-bipolar_transistor-03.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-bipolar_transistor-03.js';

@Component({
  selector: 'obi-bipolar_transistor-03',
  template: '<ng-content></ng-content>',
})
export class ObiBipolar_transistor03 {
  private _el: ObiBipolar_transistor03Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBipolar_transistor03Element>,
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

