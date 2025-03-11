import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiEnergyBattery as ObiEnergyBatteryElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-energy-battery.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-energy-battery.js';

@Component({
  selector: 'obi-energy-battery',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiEnergyBattery {
  private _el: ObiEnergyBatteryElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiEnergyBatteryElement>,
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

