import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiApplicationOpenGoogle as ObiApplicationOpenGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-application-open-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-application-open-google.js';

@Component({
  selector: 'obi-application-open-google',
  template: '<ng-content></ng-content>',
})
export class ObiApplicationOpenGoogle {
  private _el: ObiApplicationOpenGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiApplicationOpenGoogleElement>,
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

