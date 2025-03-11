import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiChartMagneticVariationIec as ObiChartMagneticVariationIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-magnetic-variation-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-magnetic-variation-iec.js';

@Component({
  selector: 'obi-chart-magnetic-variation-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiChartMagneticVariationIec {
  private _el: ObiChartMagneticVariationIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiChartMagneticVariationIecElement>,
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

