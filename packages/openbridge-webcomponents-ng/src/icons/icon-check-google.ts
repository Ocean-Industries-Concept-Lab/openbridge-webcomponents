import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCheckGoogle as ObiCheckGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-check-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-check-google.js';

@Component({
  selector: 'obi-check-google',
  template: '<ng-content></ng-content>',
})
export class ObiCheckGoogle {
  private _el: ObiCheckGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCheckGoogleElement>,
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

