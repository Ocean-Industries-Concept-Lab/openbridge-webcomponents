import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiEnergyDiesel as ObiEnergyDieselElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-energy-diesel.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-energy-diesel.js';

@Component({
  selector: 'obi-energy-diesel',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiEnergyDiesel {
  private _el: ObiEnergyDieselElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiEnergyDieselElement>,
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

