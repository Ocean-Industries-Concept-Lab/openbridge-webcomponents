import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiContentCutGoogle as ObiContentCutGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-content-cut-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-content-cut-google.js';

@Component({
  selector: 'obi-content-cut-google',
  template: '<ng-content></ng-content>',
})
export class ObiContentCutGoogle {
  private _el: ObiContentCutGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiContentCutGoogleElement>,
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

