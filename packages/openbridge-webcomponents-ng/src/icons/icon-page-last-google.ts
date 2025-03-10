import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiPageLastGoogle as ObiPageLastGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-page-last-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-page-last-google.js';

@Component({
  selector: 'obi-page-last-google',
  template: '<ng-content></ng-content>',
})
export class ObiPageLastGoogle {
  private _el: ObiPageLastGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiPageLastGoogleElement>,
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

