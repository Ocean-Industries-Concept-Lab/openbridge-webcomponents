import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiPlottedPositionIec as ObiPlottedPositionIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-plotted-position-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-plotted-position-iec.js';

@Component({
  selector: 'obi-plotted-position-iec',
  template: '<ng-content></ng-content>',
})
export class ObiPlottedPositionIec {
  private _el: ObiPlottedPositionIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiPlottedPositionIecElement>,
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

