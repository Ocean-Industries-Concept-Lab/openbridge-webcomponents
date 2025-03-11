import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightEmergencyColourOff as ObiLightEmergencyColourOffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-emergency-colour-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-emergency-colour-off.js';

@Component({
  selector: 'obi-light-emergency-colour-off',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLightEmergencyColourOff {
  private _el: ObiLightEmergencyColourOffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightEmergencyColourOffElement>,
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

