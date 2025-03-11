import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSnowShowersNight as ObiSnowShowersNightElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-snow-showers-night.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-snow-showers-night.js';

@Component({
  selector: 'obi-snow-showers-night',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiSnowShowersNight {
  private _el: ObiSnowShowersNightElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSnowShowersNightElement>,
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

