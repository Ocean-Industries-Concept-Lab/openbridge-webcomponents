import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLimitsOutsideOver as ObiLimitsOutsideOverElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-limits-outside-over.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-limits-outside-over.js';

@Component({
  selector: 'obi-limits-outside-over',
  template: '<ng-content></ng-content>',
})
export class ObiLimitsOutsideOver {
  private _el: ObiLimitsOutsideOverElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLimitsOutsideOverElement>,
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

