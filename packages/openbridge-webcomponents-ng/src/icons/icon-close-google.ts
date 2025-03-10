import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCloseGoogle as ObiCloseGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-close-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-close-google.js';

@Component({
  selector: 'obi-close-google',
  template: '<ng-content></ng-content>',
})
export class ObiCloseGoogle {
  private _el: ObiCloseGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCloseGoogleElement>,
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

