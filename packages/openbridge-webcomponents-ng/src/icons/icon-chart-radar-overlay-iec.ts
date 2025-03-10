import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiChartRadarOverlayIec as ObiChartRadarOverlayIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-radar-overlay-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-radar-overlay-iec.js';

@Component({
  selector: 'obi-chart-radar-overlay-iec',
  template: '<ng-content></ng-content>',
})
export class ObiChartRadarOverlayIec {
  private _el: ObiChartRadarOverlayIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiChartRadarOverlayIecElement>,
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

