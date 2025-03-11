import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiComCallActiveGoogle as ObiComCallActiveGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-com-call-active-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-com-call-active-google.js';

@Component({
  selector: 'obi-com-call-active-google',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiComCallActiveGoogle {
  private _el: ObiComCallActiveGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiComCallActiveGoogleElement>,
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

