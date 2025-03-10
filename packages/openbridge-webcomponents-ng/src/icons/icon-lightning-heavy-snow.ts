import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightningHeavySnow as ObiLightningHeavySnowElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-heavy-snow.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-heavy-snow.js';

@Component({
  selector: 'obi-lightning-heavy-snow',
  template: '<ng-content></ng-content>',
})
export class ObiLightningHeavySnow {
  private _el: ObiLightningHeavySnowElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightningHeavySnowElement>,
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

