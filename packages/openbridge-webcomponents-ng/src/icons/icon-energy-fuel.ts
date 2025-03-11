import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiEnergyFuel as ObiEnergyFuelElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-energy-fuel.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-energy-fuel.js';

@Component({
  selector: 'obi-energy-fuel',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiEnergyFuel {
  private _el: ObiEnergyFuelElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiEnergyFuelElement>,
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

