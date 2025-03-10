import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiHistoryGoogle as ObiHistoryGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-history-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-history-google.js';

@Component({
  selector: 'obi-history-google',
  template: '<ng-content></ng-content>',
})
export class ObiHistoryGoogle {
  private _el: ObiHistoryGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiHistoryGoogleElement>,
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

