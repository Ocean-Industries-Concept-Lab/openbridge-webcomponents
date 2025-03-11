import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiRadarPerformanceMonitorIec as ObiRadarPerformanceMonitorIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-radar-performance-monitor-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-radar-performance-monitor-iec.js';

@Component({
  selector: 'obi-radar-performance-monitor-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiRadarPerformanceMonitorIec {
  private _el: ObiRadarPerformanceMonitorIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiRadarPerformanceMonitorIecElement>,
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

