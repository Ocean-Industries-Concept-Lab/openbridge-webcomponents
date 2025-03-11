import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightBacklightButtonsOff as ObiLightBacklightButtonsOffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-backlight-buttons-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-backlight-buttons-off.js';

@Component({
  selector: 'obi-light-backlight-buttons-off',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLightBacklightButtonsOff {
  private _el: ObiLightBacklightButtonsOffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightBacklightButtonsOffElement>,
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

