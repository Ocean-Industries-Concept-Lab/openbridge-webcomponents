import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLogEditGoogle as ObiLogEditGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-log-edit-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-log-edit-google.js';

@Component({
  selector: 'obi-log-edit-google',
  template: '<ng-content></ng-content>',
})
export class ObiLogEditGoogle {
  private _el: ObiLogEditGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLogEditGoogleElement>,
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

