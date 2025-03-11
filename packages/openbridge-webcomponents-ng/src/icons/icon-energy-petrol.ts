import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiEnergyPetrol as ObiEnergyPetrolElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-energy-petrol.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-energy-petrol.js';

@Component({
  selector: 'obi-energy-petrol',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiEnergyPetrol {
  private _el: ObiEnergyPetrolElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiEnergyPetrolElement>,
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

