import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightningHeavySnowShowersNightColour as ObiLightningHeavySnowShowersNightColourElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-heavy-snow-showers-night-colour.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-heavy-snow-showers-night-colour.js';

@Component({
  selector: 'obi-lightning-heavy-snow-showers-night-colour',
  template: '<ng-content></ng-content>',
})
export class ObiLightningHeavySnowShowersNightColour {
  private _el: ObiLightningHeavySnowShowersNightColourElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightningHeavySnowShowersNightColourElement>,
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

