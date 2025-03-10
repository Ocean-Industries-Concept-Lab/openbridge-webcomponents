import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiRadarRainIec as ObiRadarRainIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-radar-rain-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-radar-rain-iec.js';

@Component({
  selector: 'obi-radar-rain-iec',
  template: '<ng-content></ng-content>',
})
export class ObiRadarRainIec {
  private _el: ObiRadarRainIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiRadarRainIecElement>,
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

