import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightLanternStbdOff as ObiLightLanternStbdOffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-lantern-stbd-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-lantern-stbd-off.js';

@Component({
  selector: 'obi-light-lantern-stbd-off',
  template: '<ng-content></ng-content>',
})
export class ObiLightLanternStbdOff {
  private _el: ObiLightLanternStbdOffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightLanternStbdOffElement>,
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

