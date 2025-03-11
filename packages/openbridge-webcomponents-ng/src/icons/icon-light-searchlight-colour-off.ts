import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightSearchlightColourOff as ObiLightSearchlightColourOffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-searchlight-colour-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-searchlight-colour-off.js';

@Component({
  selector: 'obi-light-searchlight-colour-off',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLightSearchlightColourOff {
  private _el: ObiLightSearchlightColourOffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightSearchlightColourOffElement>,
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

