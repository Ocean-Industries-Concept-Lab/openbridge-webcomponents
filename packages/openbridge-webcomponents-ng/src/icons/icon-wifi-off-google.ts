import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiWifiOffGoogle as ObiWifiOffGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wifi-off-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wifi-off-google.js';

@Component({
  selector: 'obi-wifi-off-google',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiWifiOffGoogle {
  private _el: ObiWifiOffGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiWifiOffGoogleElement>,
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

