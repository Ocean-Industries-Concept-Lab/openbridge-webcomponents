import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLimitsImproving as ObiLimitsImprovingElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-limits-improving.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-limits-improving.js';

@Component({
  selector: 'obi-limits-improving',
  template: '<ng-content></ng-content>',
})
export class ObiLimitsImproving {
  private _el: ObiLimitsImprovingElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLimitsImprovingElement>,
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

