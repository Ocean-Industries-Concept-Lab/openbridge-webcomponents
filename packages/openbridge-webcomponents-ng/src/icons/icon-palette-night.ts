import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiPaletteNight as ObiPaletteNightElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-palette-night.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-palette-night.js';

@Component({
  selector: 'obi-palette-night',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiPaletteNight {
  private _el: ObiPaletteNightElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiPaletteNightElement>,
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

