import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightBulb as ObiLightBulbElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-bulb.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-bulb.js';

@Component({
  selector: 'obi-light-bulb',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLightBulb {
  private _el: ObiLightBulbElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightBulbElement>,
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

