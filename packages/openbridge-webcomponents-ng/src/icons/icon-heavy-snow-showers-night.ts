import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiHeavySnowShowersNight as ObiHeavySnowShowersNightElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heavy-snow-showers-night.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heavy-snow-showers-night.js';

@Component({
  selector: 'obi-heavy-snow-showers-night',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiHeavySnowShowersNight {
  private _el: ObiHeavySnowShowersNightElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiHeavySnowShowersNightElement>,
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

