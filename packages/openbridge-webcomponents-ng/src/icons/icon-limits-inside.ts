import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLimitsInside as ObiLimitsInsideElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-limits-inside.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-limits-inside.js';

@Component({
  selector: 'obi-limits-inside',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLimitsInside {
  private _el: ObiLimitsInsideElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLimitsInsideElement>,
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

