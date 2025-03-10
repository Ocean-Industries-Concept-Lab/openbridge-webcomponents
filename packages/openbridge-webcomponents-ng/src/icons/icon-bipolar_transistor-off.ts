import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBipolar_transistorOff as ObiBipolar_transistorOffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-bipolar_transistor-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-bipolar_transistor-off.js';

@Component({
  selector: 'obi-bipolar_transistor-off',
  template: '<ng-content></ng-content>',
})
export class ObiBipolar_transistorOff {
  private _el: ObiBipolar_transistorOffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBipolar_transistorOffElement>,
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

