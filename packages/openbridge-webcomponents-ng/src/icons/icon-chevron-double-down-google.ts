import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiChevronDoubleDownGoogle as ObiChevronDoubleDownGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chevron-double-down-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chevron-double-down-google.js';

@Component({
  selector: 'obi-chevron-double-down-google',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiChevronDoubleDownGoogle {
  private _el: ObiChevronDoubleDownGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiChevronDoubleDownGoogleElement>,
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

