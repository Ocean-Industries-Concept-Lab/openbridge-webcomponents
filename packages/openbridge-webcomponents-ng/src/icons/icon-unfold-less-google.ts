import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiUnfoldLessGoogle as ObiUnfoldLessGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-unfold-less-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-unfold-less-google.js';

@Component({
  selector: 'obi-unfold-less-google',
  template: '<ng-content></ng-content>',
})
export class ObiUnfoldLessGoogle {
  private _el: ObiUnfoldLessGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiUnfoldLessGoogleElement>,
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

