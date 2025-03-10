import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLocation2 as ObiLocation2Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-location-2.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-location-2.js';

@Component({
  selector: 'obi-location-2',
  template: '<ng-content></ng-content>',
})
export class ObiLocation2 {
  private _el: ObiLocation2Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLocation2Element>,
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

