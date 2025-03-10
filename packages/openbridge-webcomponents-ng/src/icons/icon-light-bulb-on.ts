import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightBulbOn as ObiLightBulbOnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-bulb-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-bulb-on.js';

@Component({
  selector: 'obi-light-bulb-on',
  template: '<ng-content></ng-content>',
})
export class ObiLightBulbOn {
  private _el: ObiLightBulbOnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightBulbOnElement>,
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

