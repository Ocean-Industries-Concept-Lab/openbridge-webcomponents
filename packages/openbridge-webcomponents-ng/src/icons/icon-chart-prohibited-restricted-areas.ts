import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiChartProhibitedRestrictedAreas as ObiChartProhibitedRestrictedAreasElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-prohibited-restricted-areas.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-prohibited-restricted-areas.js';

@Component({
  selector: 'obi-chart-prohibited-restricted-areas',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiChartProhibitedRestrictedAreas {
  private _el: ObiChartProhibitedRestrictedAreasElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiChartProhibitedRestrictedAreasElement>,
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

