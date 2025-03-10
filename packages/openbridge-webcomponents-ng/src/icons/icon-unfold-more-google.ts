import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiUnfoldMoreGoogle as ObiUnfoldMoreGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-unfold-more-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-unfold-more-google.js';

@Component({
  selector: 'obi-unfold-more-google',
  template: '<ng-content></ng-content>',
})
export class ObiUnfoldMoreGoogle {
  private _el: ObiUnfoldMoreGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiUnfoldMoreGoogleElement>,
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

