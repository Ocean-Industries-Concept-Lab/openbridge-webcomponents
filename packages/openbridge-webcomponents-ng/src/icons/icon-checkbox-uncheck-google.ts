import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCheckboxUncheckGoogle as ObiCheckboxUncheckGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-checkbox-uncheck-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-checkbox-uncheck-google.js';

@Component({
  selector: 'obi-checkbox-uncheck-google',
  template: '<ng-content></ng-content>',
})
export class ObiCheckboxUncheckGoogle {
  private _el: ObiCheckboxUncheckGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCheckboxUncheckGoogleElement>,
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

