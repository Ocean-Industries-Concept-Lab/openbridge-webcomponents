import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiChartDisplaySettingsIec as ObiChartDisplaySettingsIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-display-settings-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-display-settings-iec.js';

@Component({
  selector: 'obi-chart-display-settings-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiChartDisplaySettingsIec {
  private _el: ObiChartDisplaySettingsIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiChartDisplaySettingsIecElement>,
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

