import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiChevronDownGoogle as ObiChevronDownGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chevron-down-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chevron-down-google.js';

@Component({
  selector: 'obi-chevron-down-google',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiChevronDownGoogle {
  private _el: ObiChevronDownGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiChevronDownGoogleElement>,
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

