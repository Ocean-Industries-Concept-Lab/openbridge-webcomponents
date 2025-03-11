import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiChartSettings as ObiChartSettingsElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-settings.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-settings.js';

@Component({
  selector: 'obi-chart-settings',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiChartSettings {
  private _el: ObiChartSettingsElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiChartSettingsElement>,
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

