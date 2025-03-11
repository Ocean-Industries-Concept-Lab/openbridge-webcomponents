import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiEnergyHydrogen as ObiEnergyHydrogenElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-energy-hydrogen.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-energy-hydrogen.js';

@Component({
  selector: 'obi-energy-hydrogen',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiEnergyHydrogen {
  private _el: ObiEnergyHydrogenElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiEnergyHydrogenElement>,
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

