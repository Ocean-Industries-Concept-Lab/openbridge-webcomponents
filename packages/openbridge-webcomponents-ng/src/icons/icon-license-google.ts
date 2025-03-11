import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLicenseGoogle as ObiLicenseGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-license-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-license-google.js';

@Component({
  selector: 'obi-license-google',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLicenseGoogle {
  private _el: ObiLicenseGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLicenseGoogleElement>,
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

