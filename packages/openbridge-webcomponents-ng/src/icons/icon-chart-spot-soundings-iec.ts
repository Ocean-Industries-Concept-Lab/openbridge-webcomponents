import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiChartSpotSoundingsIec as ObiChartSpotSoundingsIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-spot-soundings-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-spot-soundings-iec.js';

@Component({
  selector: 'obi-chart-spot-soundings-iec',
  template: '<ng-content></ng-content>',
})
export class ObiChartSpotSoundingsIec {
  private _el: ObiChartSpotSoundingsIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiChartSpotSoundingsIecElement>,
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

