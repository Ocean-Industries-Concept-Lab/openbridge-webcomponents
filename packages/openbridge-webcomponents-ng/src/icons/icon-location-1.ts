import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLocation1 as ObiLocation1Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-location-1.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-location-1.js';

@Component({
  selector: 'obi-location-1',
  template: '<ng-content></ng-content>',
})
export class ObiLocation1 {
  private _el: ObiLocation1Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLocation1Element>,
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

