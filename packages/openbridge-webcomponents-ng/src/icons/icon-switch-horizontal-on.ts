import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSwitchHorizontalOn as ObiSwitchHorizontalOnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-switch-horizontal-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-switch-horizontal-on.js';

@Component({
  selector: 'obi-switch-horizontal-on',
  template: '<ng-content></ng-content>',
})
export class ObiSwitchHorizontalOn {
  private _el: ObiSwitchHorizontalOnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSwitchHorizontalOnElement>,
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

