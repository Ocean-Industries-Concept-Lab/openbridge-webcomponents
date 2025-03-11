import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightEmergency as ObiLightEmergencyElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-emergency.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-emergency.js';

@Component({
  selector: 'obi-light-emergency',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLightEmergency {
  private _el: ObiLightEmergencyElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightEmergencyElement>,
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

