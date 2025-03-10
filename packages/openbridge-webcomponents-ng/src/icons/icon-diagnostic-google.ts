import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiDiagnosticGoogle as ObiDiagnosticGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-diagnostic-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-diagnostic-google.js';

@Component({
  selector: 'obi-diagnostic-google',
  template: '<ng-content></ng-content>',
})
export class ObiDiagnosticGoogle {
  private _el: ObiDiagnosticGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiDiagnosticGoogleElement>,
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

