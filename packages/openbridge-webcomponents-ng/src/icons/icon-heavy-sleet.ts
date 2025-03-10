import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiHeavySleet as ObiHeavySleetElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heavy-sleet.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heavy-sleet.js';

@Component({
  selector: 'obi-heavy-sleet',
  template: '<ng-content></ng-content>',
})
export class ObiHeavySleet {
  private _el: ObiHeavySleetElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiHeavySleetElement>,
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

