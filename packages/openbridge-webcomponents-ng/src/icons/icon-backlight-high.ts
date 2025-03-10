import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBacklightHigh as ObiBacklightHighElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-backlight-high.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-backlight-high.js';

@Component({
  selector: 'obi-backlight-high',
  template: '<ng-content></ng-content>',
})
export class ObiBacklightHigh {
  private _el: ObiBacklightHighElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBacklightHighElement>,
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

