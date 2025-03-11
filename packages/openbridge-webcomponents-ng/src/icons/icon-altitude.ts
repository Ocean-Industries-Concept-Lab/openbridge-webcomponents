import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAltitude as ObiAltitudeElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-altitude.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-altitude.js';

@Component({
  selector: 'obi-altitude',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiAltitude {
  private _el: ObiAltitudeElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAltitudeElement>,
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

