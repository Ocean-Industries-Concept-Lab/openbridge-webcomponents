import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiUserGoogle as ObiUserGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-user-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-user-google.js';

@Component({
  selector: 'obi-user-google',
  template: '<ng-content></ng-content>',
})
export class ObiUserGoogle {
  private _el: ObiUserGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiUserGoogleElement>,
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

