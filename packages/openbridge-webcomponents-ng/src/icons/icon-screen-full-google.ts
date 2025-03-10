import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiScreenFullGoogle as ObiScreenFullGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-screen-full-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-screen-full-google.js';

@Component({
  selector: 'obi-screen-full-google',
  template: '<ng-content></ng-content>',
})
export class ObiScreenFullGoogle {
  private _el: ObiScreenFullGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiScreenFullGoogleElement>,
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

