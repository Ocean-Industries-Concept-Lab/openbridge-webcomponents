import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightningRain as ObiLightningRainElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-rain.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-rain.js';

@Component({
  selector: 'obi-lightning-rain',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLightningRain {
  private _el: ObiLightningRainElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightningRainElement>,
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

