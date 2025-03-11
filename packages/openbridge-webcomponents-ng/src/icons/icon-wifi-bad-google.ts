import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiWifiBadGoogle as ObiWifiBadGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wifi-bad-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wifi-bad-google.js';

@Component({
  selector: 'obi-wifi-bad-google',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiWifiBadGoogle {
  private _el: ObiWifiBadGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiWifiBadGoogleElement>,
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

