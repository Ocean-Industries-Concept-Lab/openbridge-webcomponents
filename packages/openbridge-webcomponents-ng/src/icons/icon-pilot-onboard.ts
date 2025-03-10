import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiPilotOnboard as ObiPilotOnboardElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-pilot-onboard.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-pilot-onboard.js';

@Component({
  selector: 'obi-pilot-onboard',
  template: '<ng-content></ng-content>',
})
export class ObiPilotOnboard {
  private _el: ObiPilotOnboardElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiPilotOnboardElement>,
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

