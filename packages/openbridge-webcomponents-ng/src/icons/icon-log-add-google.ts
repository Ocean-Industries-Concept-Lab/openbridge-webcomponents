import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLogAddGoogle as ObiLogAddGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-log-add-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-log-add-google.js';

@Component({
  selector: 'obi-log-add-google',
  template: '<ng-content></ng-content>',
})
export class ObiLogAddGoogle {
  private _el: ObiLogAddGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLogAddGoogleElement>,
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

