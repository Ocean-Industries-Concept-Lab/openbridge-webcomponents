import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightBulbOff as ObiLightBulbOffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-bulb-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-bulb-off.js';

@Component({
  selector: 'obi-light-bulb-off',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLightBulbOff {
  private _el: ObiLightBulbOffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightBulbOffElement>,
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

