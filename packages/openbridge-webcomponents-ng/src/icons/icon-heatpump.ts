import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiHeatpump as ObiHeatpumpElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heatpump.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heatpump.js';

@Component({
  selector: 'obi-heatpump',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiHeatpump {
  private _el: ObiHeatpumpElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiHeatpumpElement>,
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

