import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAutonomousMarineRadioDeviceIec as ObiAutonomousMarineRadioDeviceIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-autonomous-marine-radio-device-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-autonomous-marine-radio-device-iec.js';

@Component({
  selector: 'obi-autonomous-marine-radio-device-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiAutonomousMarineRadioDeviceIec {
  private _el: ObiAutonomousMarineRadioDeviceIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAutonomousMarineRadioDeviceIecElement>,
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

