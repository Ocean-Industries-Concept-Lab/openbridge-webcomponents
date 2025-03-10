import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBipolar_transistorOn as ObiBipolar_transistorOnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-bipolar_transistor-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-bipolar_transistor-on.js';

@Component({
  selector: 'obi-bipolar_transistor-on',
  template: '<ng-content></ng-content>',
})
export class ObiBipolar_transistorOn {
  private _el: ObiBipolar_transistorOnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBipolar_transistorOnElement>,
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

