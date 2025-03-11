import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightEmergencyOff as ObiLightEmergencyOffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-emergency-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-emergency-off.js';

@Component({
  selector: 'obi-light-emergency-off',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLightEmergencyOff {
  private _el: ObiLightEmergencyOffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightEmergencyOffElement>,
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

