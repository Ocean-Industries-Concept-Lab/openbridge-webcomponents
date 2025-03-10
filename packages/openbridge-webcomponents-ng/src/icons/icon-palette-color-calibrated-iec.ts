import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiPaletteColorCalibratedIec as ObiPaletteColorCalibratedIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-palette-color-calibrated-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-palette-color-calibrated-iec.js';

@Component({
  selector: 'obi-palette-color-calibrated-iec',
  template: '<ng-content></ng-content>',
})
export class ObiPaletteColorCalibratedIec {
  private _el: ObiPaletteColorCalibratedIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiPaletteColorCalibratedIecElement>,
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

