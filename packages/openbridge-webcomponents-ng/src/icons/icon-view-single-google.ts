import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiViewSingleGoogle as ObiViewSingleGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-view-single-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-view-single-google.js';

@Component({
  selector: 'obi-view-single-google',
  template: '<ng-content></ng-content>',
})
export class ObiViewSingleGoogle {
  private _el: ObiViewSingleGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiViewSingleGoogleElement>,
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

