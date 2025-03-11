import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAlertOffGoogle as ObiAlertOffGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-alert-off-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-alert-off-google.js';

@Component({
  selector: 'obi-alert-off-google',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiAlertOffGoogle {
  private _el: ObiAlertOffGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAlertOffGoogleElement>,
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

