import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightSearchlightOff as ObiLightSearchlightOffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-searchlight-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-searchlight-off.js';

@Component({
  selector: 'obi-light-searchlight-off',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLightSearchlightOff {
  private _el: ObiLightSearchlightOffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightSearchlightOffElement>,
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

