import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCalendarGoogle as ObiCalendarGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-calendar-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-calendar-google.js';

@Component({
  selector: 'obi-calendar-google',
  template: '<ng-content></ng-content>',
})
export class ObiCalendarGoogle {
  private _el: ObiCalendarGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCalendarGoogleElement>,
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

