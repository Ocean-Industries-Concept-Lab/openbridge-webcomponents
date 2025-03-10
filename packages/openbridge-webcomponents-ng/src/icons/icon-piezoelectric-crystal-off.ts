import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiPiezoelectricCrystalOff as ObiPiezoelectricCrystalOffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-piezoelectric-crystal-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-piezoelectric-crystal-off.js';

@Component({
  selector: 'obi-piezoelectric-crystal-off',
  template: '<ng-content></ng-content>',
})
export class ObiPiezoelectricCrystalOff {
  private _el: ObiPiezoelectricCrystalOffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiPiezoelectricCrystalOffElement>,
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

