import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightSearchlightColourOn as ObiLightSearchlightColourOnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-searchlight-colour-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-searchlight-colour-on.js';

@Component({
  selector: 'obi-light-searchlight-colour-on',
  template: '<ng-content></ng-content>',
})
export class ObiLightSearchlightColourOn {
  private _el: ObiLightSearchlightColourOnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightSearchlightColourOnElement>,
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

