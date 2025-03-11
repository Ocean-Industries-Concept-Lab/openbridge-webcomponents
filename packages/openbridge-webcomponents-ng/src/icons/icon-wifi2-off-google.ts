import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiWifi2OffGoogle as ObiWifi2OffGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wifi2-off-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wifi2-off-google.js';

@Component({
  selector: 'obi-wifi2-off-google',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiWifi2OffGoogle {
  private _el: ObiWifi2OffGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiWifi2OffGoogleElement>,
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

