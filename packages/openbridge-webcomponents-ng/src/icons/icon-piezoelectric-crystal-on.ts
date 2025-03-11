import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiPiezoelectricCrystalOn as ObiPiezoelectricCrystalOnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-piezoelectric-crystal-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-piezoelectric-crystal-on.js';

@Component({
  selector: 'obi-piezoelectric-crystal-on',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiPiezoelectricCrystalOn {
  private _el: ObiPiezoelectricCrystalOnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiPiezoelectricCrystalOnElement>,
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

