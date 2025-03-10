import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTimeGoogle as ObiTimeGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-time-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-time-google.js';

@Component({
  selector: 'obi-time-google',
  template: '<ng-content></ng-content>',
})
export class ObiTimeGoogle {
  private _el: ObiTimeGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTimeGoogleElement>,
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

