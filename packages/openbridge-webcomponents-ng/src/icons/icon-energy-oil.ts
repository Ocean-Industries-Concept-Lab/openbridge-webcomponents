import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiEnergyOil as ObiEnergyOilElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-energy-oil.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-energy-oil.js';

@Component({
  selector: 'obi-energy-oil',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiEnergyOil {
  private _el: ObiEnergyOilElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiEnergyOilElement>,
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

