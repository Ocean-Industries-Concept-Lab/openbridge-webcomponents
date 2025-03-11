import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiChartAtonIec as ObiChartAtonIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-aton-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-aton-iec.js';

@Component({
  selector: 'obi-chart-aton-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiChartAtonIec {
  private _el: ObiChartAtonIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiChartAtonIecElement>,
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

