import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightningHeavySnowColour as ObiLightningHeavySnowColourElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-heavy-snow-colour.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-heavy-snow-colour.js';

@Component({
  selector: 'obi-lightning-heavy-snow-colour',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLightningHeavySnowColour {
  private _el: ObiLightningHeavySnowColourElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightningHeavySnowColourElement>,
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

