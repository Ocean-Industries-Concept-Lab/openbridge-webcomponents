import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiWiperFluid as ObiWiperFluidElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wiper-fluid.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wiper-fluid.js';

@Component({
  selector: 'obi-wiper-fluid',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiWiperFluid {
  private _el: ObiWiperFluidElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiWiperFluidElement>,
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

