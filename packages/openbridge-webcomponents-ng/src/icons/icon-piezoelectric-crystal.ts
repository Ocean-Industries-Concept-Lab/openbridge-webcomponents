import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiPiezoelectricCrystal as ObiPiezoelectricCrystalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-piezoelectric-crystal.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-piezoelectric-crystal.js';

@Component({
  selector: 'obi-piezoelectric-crystal',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiPiezoelectricCrystal {
  private _el: ObiPiezoelectricCrystalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiPiezoelectricCrystalElement>,
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

