import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLogOpenGoogle as ObiLogOpenGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-log-open-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-log-open-google.js';

@Component({
  selector: 'obi-log-open-google',
  template: '<ng-content></ng-content>',
})
export class ObiLogOpenGoogle {
  private _el: ObiLogOpenGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLogOpenGoogleElement>,
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

