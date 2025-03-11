import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiChevronDoubleUpGoogle as ObiChevronDoubleUpGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chevron-double-up-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chevron-double-up-google.js';

@Component({
  selector: 'obi-chevron-double-up-google',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiChevronDoubleUpGoogle {
  private _el: ObiChevronDoubleUpGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiChevronDoubleUpGoogleElement>,
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

