import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiChartArchipelagicSeaLanes as ObiChartArchipelagicSeaLanesElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-archipelagic-sea-lanes.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-archipelagic-sea-lanes.js';

@Component({
  selector: 'obi-chart-archipelagic-sea-lanes',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiChartArchipelagicSeaLanes {
  private _el: ObiChartArchipelagicSeaLanesElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiChartArchipelagicSeaLanesElement>,
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

