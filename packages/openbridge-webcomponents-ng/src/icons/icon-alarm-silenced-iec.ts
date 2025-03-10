import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAlarmSilencedIec as ObiAlarmSilencedIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-alarm-silenced-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-alarm-silenced-iec.js';

@Component({
  selector: 'obi-alarm-silenced-iec',
  template: '<ng-content></ng-content>',
})
export class ObiAlarmSilencedIec {
  private _el: ObiAlarmSilencedIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAlarmSilencedIecElement>,
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

