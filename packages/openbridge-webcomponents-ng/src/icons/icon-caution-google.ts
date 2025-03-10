import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCautionGoogle as ObiCautionGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-caution-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-caution-google.js';

@Component({
  selector: 'obi-caution-google',
  template: '<ng-content></ng-content>',
})
export class ObiCautionGoogle {
  private _el: ObiCautionGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCautionGoogleElement>,
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

