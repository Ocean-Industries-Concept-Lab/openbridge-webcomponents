import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightEmergencyColourOn as ObiLightEmergencyColourOnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-emergency-colour-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-emergency-colour-on.js';

@Component({
  selector: 'obi-light-emergency-colour-on',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLightEmergencyColourOn {
  private _el: ObiLightEmergencyColourOnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightEmergencyColourOnElement>,
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

