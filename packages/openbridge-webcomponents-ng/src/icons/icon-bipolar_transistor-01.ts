import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBipolar_transistor01 as ObiBipolar_transistor01Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-bipolar_transistor-01.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-bipolar_transistor-01.js';

@Component({
  selector: 'obi-bipolar_transistor-01',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBipolar_transistor01 {
  private _el: ObiBipolar_transistor01Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBipolar_transistor01Element>,
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

