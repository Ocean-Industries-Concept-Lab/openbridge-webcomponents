import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiWarningGoogle as ObiWarningGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-warning-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-warning-google.js';

@Component({
  selector: 'obi-warning-google',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiWarningGoogle {
  private _el: ObiWarningGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiWarningGoogleElement>,
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

