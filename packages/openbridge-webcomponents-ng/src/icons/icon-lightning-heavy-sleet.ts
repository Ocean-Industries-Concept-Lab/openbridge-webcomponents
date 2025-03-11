import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightningHeavySleet as ObiLightningHeavySleetElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-heavy-sleet.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-heavy-sleet.js';

@Component({
  selector: 'obi-lightning-heavy-sleet',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLightningHeavySleet {
  private _el: ObiLightningHeavySleetElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightningHeavySleetElement>,
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

