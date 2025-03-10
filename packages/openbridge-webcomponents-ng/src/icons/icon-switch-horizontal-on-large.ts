import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSwitchHorizontalOnLarge as ObiSwitchHorizontalOnLargeElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-switch-horizontal-on-large.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-switch-horizontal-on-large.js';

@Component({
  selector: 'obi-switch-horizontal-on-large',
  template: '<ng-content></ng-content>',
})
export class ObiSwitchHorizontalOnLarge {
  private _el: ObiSwitchHorizontalOnLargeElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSwitchHorizontalOnLargeElement>,
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

