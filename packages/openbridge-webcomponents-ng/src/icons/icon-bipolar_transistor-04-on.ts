import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBipolar_transistor04On as ObiBipolar_transistor04OnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-bipolar_transistor-04-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-bipolar_transistor-04-on.js';

@Component({
  selector: 'obi-bipolar_transistor-04-on',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBipolar_transistor04On {
  private _el: ObiBipolar_transistor04OnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBipolar_transistor04OnElement>,
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

