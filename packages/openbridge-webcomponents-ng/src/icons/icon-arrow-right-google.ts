import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiArrowRightGoogle as ObiArrowRightGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-arrow-right-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-arrow-right-google.js';

@Component({
  selector: 'obi-arrow-right-google',
  template: '<ng-content></ng-content>',
})
export class ObiArrowRightGoogle {
  private _el: ObiArrowRightGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiArrowRightGoogleElement>,
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

