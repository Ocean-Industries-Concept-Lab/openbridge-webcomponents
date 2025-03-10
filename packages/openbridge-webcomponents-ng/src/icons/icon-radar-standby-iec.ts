import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiRadarStandbyIec as ObiRadarStandbyIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-radar-standby-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-radar-standby-iec.js';

@Component({
  selector: 'obi-radar-standby-iec',
  template: '<ng-content></ng-content>',
})
export class ObiRadarStandbyIec {
  private _el: ObiRadarStandbyIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiRadarStandbyIecElement>,
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

