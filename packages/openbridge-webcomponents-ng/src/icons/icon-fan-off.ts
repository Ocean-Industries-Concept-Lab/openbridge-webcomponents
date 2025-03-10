import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiFanOff as ObiFanOffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-fan-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-fan-off.js';

@Component({
  selector: 'obi-fan-off',
  template: '<ng-content></ng-content>',
})
export class ObiFanOff {
  private _el: ObiFanOffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiFanOffElement>,
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

