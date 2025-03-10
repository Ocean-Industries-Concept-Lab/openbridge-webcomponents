import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSwitchHorizontalOffLarge as ObiSwitchHorizontalOffLargeElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-switch-horizontal-off-large.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-switch-horizontal-off-large.js';

@Component({
  selector: 'obi-switch-horizontal-off-large',
  template: '<ng-content></ng-content>',
})
export class ObiSwitchHorizontalOffLarge {
  private _el: ObiSwitchHorizontalOffLargeElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSwitchHorizontalOffLargeElement>,
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

