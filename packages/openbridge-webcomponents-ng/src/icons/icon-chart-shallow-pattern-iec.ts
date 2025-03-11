import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiChartShallowPatternIec as ObiChartShallowPatternIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-shallow-pattern-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-shallow-pattern-iec.js';

@Component({
  selector: 'obi-chart-shallow-pattern-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiChartShallowPatternIec {
  private _el: ObiChartShallowPatternIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiChartShallowPatternIecElement>,
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

