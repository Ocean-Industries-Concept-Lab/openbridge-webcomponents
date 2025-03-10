import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiPinGoogle as ObiPinGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-pin-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-pin-google.js';

@Component({
  selector: 'obi-pin-google',
  template: '<ng-content></ng-content>',
})
export class ObiPinGoogle {
  private _el: ObiPinGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiPinGoogleElement>,
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

