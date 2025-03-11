import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAlarmAcknowledgedIec as ObiAlarmAcknowledgedIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-alarm-acknowledged-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-alarm-acknowledged-iec.js';

@Component({
  selector: 'obi-alarm-acknowledged-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiAlarmAcknowledgedIec {
  private _el: ObiAlarmAcknowledgedIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAlarmAcknowledgedIecElement>,
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

