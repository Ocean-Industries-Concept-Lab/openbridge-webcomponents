import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSimulation as ObiSimulationElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-simulation.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-simulation.js';

@Component({
  selector: 'obi-simulation',
  template: '<ng-content></ng-content>',
})
export class ObiSimulation {
  private _el: ObiSimulationElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSimulationElement>,
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

