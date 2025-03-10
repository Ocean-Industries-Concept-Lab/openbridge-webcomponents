import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiPaletteDimming as ObiPaletteDimmingElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-palette-dimming.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-palette-dimming.js';

@Component({
  selector: 'obi-palette-dimming',
  template: '<ng-content></ng-content>',
})
export class ObiPaletteDimming {
  private _el: ObiPaletteDimmingElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiPaletteDimmingElement>,
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

