import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBacklightLow as ObiBacklightLowElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-backlight-low.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-backlight-low.js';

@Component({
  selector: 'obi-backlight-low',
  template: '<ng-content></ng-content>',
})
export class ObiBacklightLow {
  private _el: ObiBacklightLowElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBacklightLowElement>,
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

