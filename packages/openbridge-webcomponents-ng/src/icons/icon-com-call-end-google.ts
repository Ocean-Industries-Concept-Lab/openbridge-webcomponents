import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiComCallEndGoogle as ObiComCallEndGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-com-call-end-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-com-call-end-google.js';

@Component({
  selector: 'obi-com-call-end-google',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiComCallEndGoogle {
  private _el: ObiComCallEndGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiComCallEndGoogleElement>,
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

