import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBipolar_transistor03On as ObiBipolar_transistor03OnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-bipolar_transistor-03-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-bipolar_transistor-03-on.js';

@Component({
  selector: 'obi-bipolar_transistor-03-on',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBipolar_transistor03On {
  private _el: ObiBipolar_transistor03OnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBipolar_transistor03OnElement>,
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

