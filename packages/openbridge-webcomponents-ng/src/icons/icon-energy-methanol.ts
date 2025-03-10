import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiEnergyMethanol as ObiEnergyMethanolElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-energy-methanol.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-energy-methanol.js';

@Component({
  selector: 'obi-energy-methanol',
  template: '<ng-content></ng-content>',
})
export class ObiEnergyMethanol {
  private _el: ObiEnergyMethanolElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiEnergyMethanolElement>,
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

