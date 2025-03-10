import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSwitchHorizontalOff as ObiSwitchHorizontalOffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-switch-horizontal-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-switch-horizontal-off.js';

@Component({
  selector: 'obi-switch-horizontal-off',
  template: '<ng-content></ng-content>',
})
export class ObiSwitchHorizontalOff {
  private _el: ObiSwitchHorizontalOffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSwitchHorizontalOffElement>,
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

