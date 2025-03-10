import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiPinSelectedGoogle as ObiPinSelectedGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-pin-selected-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-pin-selected-google.js';

@Component({
  selector: 'obi-pin-selected-google',
  template: '<ng-content></ng-content>',
})
export class ObiPinSelectedGoogle {
  private _el: ObiPinSelectedGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiPinSelectedGoogleElement>,
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

