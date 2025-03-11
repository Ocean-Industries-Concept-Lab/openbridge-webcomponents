import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiChevronDoubleRightGoogle as ObiChevronDoubleRightGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chevron-double-right-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chevron-double-right-google.js';

@Component({
  selector: 'obi-chevron-double-right-google',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiChevronDoubleRightGoogle {
  private _el: ObiChevronDoubleRightGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiChevronDoubleRightGoogleElement>,
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

