import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiEnergyAmmonia as ObiEnergyAmmoniaElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-energy-ammonia.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-energy-ammonia.js';

@Component({
  selector: 'obi-energy-ammonia',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiEnergyAmmonia {
  private _el: ObiEnergyAmmoniaElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiEnergyAmmoniaElement>,
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

