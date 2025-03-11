import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiChartHighlightInformationIec as ObiChartHighlightInformationIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-highlight-information-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-highlight-information-iec.js';

@Component({
  selector: 'obi-chart-highlight-information-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiChartHighlightInformationIec {
  private _el: ObiChartHighlightInformationIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiChartHighlightInformationIecElement>,
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

