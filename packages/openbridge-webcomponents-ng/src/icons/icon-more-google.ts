import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiMoreGoogle as ObiMoreGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-more-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-more-google.js';

@Component({
  selector: 'obi-more-google',
  template: '<ng-content></ng-content>',
})
export class ObiMoreGoogle {
  private _el: ObiMoreGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiMoreGoogleElement>,
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

