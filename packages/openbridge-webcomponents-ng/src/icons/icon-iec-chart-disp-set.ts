import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiIecChartDispSet as ObiIecChartDispSetElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-iec-chart-disp-set.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-iec-chart-disp-set.js';

@Component({
  selector: 'obi-iec-chart-disp-set',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiIecChartDispSet {
  private _el: ObiIecChartDispSetElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiIecChartDispSetElement>,
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

