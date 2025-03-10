import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiHeatGoogle as ObiHeatGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heat-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heat-google.js';

@Component({
  selector: 'obi-heat-google',
  template: '<ng-content></ng-content>',
})
export class ObiHeatGoogle {
  private _el: ObiHeatGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiHeatGoogleElement>,
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

