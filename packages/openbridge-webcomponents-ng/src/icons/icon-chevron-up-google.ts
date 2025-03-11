import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiChevronUpGoogle as ObiChevronUpGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chevron-up-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chevron-up-google.js';

@Component({
  selector: 'obi-chevron-up-google',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiChevronUpGoogle {
  private _el: ObiChevronUpGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiChevronUpGoogleElement>,
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

