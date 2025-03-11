import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightBacklightButtonslightBacklightButtonsColourOff as ObiLightBacklightButtonslightBacklightButtonsColourOffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-backlight-buttonslight-backlight-buttons-colour-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-backlight-buttonslight-backlight-buttons-colour-off.js';

@Component({
  selector: 'obi-light-backlight-buttonslight-backlight-buttons-colour-off',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLightBacklightButtonslightBacklightButtonsColourOff {
  private _el: ObiLightBacklightButtonslightBacklightButtonsColourOffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightBacklightButtonslightBacklightButtonsColourOffElement>,
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

