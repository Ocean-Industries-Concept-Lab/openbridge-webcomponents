import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBipolar_transistor02 as ObiBipolar_transistor02Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-bipolar_transistor-02.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-bipolar_transistor-02.js';

@Component({
  selector: 'obi-bipolar_transistor-02',
  template: '<ng-content></ng-content>',
})
export class ObiBipolar_transistor02 {
  private _el: ObiBipolar_transistor02Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBipolar_transistor02Element>,
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

