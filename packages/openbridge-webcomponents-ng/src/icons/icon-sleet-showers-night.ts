import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSleetShowersNight as ObiSleetShowersNightElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sleet-showers-night.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sleet-showers-night.js';

@Component({
  selector: 'obi-sleet-showers-night',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiSleetShowersNight {
  private _el: ObiSleetShowersNightElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSleetShowersNightElement>,
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

