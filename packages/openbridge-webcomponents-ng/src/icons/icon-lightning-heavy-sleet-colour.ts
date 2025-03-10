import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightningHeavySleetColour as ObiLightningHeavySleetColourElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-heavy-sleet-colour.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-heavy-sleet-colour.js';

@Component({
  selector: 'obi-lightning-heavy-sleet-colour',
  template: '<ng-content></ng-content>',
})
export class ObiLightningHeavySleetColour {
  private _el: ObiLightningHeavySleetColourElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightningHeavySleetColourElement>,
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

