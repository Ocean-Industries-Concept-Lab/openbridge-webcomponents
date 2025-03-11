import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightBacklightButtons as ObiLightBacklightButtonsElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-backlight-buttons.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-backlight-buttons.js';

@Component({
  selector: 'obi-light-backlight-buttons',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLightBacklightButtons {
  private _el: ObiLightBacklightButtonsElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightBacklightButtonsElement>,
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

