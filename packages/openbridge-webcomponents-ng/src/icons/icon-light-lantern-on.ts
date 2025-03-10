import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightLanternOn as ObiLightLanternOnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-lantern-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-lantern-on.js';

@Component({
  selector: 'obi-light-lantern-on',
  template: '<ng-content></ng-content>',
})
export class ObiLightLanternOn {
  private _el: ObiLightLanternOnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightLanternOnElement>,
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

