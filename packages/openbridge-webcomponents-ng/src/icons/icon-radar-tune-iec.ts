import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiRadarTuneIec as ObiRadarTuneIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-radar-tune-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-radar-tune-iec.js';

@Component({
  selector: 'obi-radar-tune-iec',
  template: '<ng-content></ng-content>',
})
export class ObiRadarTuneIec {
  private _el: ObiRadarTuneIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiRadarTuneIecElement>,
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

