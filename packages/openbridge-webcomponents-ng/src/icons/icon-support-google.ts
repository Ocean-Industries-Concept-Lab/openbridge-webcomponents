import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSupportGoogle as ObiSupportGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-support-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-support-google.js';

@Component({
  selector: 'obi-support-google',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiSupportGoogle {
  private _el: ObiSupportGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSupportGoogleElement>,
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

