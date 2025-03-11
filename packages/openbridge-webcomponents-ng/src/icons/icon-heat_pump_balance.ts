import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiHeat_pump_balance as ObiHeat_pump_balanceElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heat_pump_balance.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heat_pump_balance.js';

@Component({
  selector: 'obi-heat_pump_balance',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiHeat_pump_balance {
  private _el: ObiHeat_pump_balanceElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiHeat_pump_balanceElement>,
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

