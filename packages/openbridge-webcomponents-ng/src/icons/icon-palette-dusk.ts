import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiPaletteDusk as ObiPaletteDuskElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-palette-dusk.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-palette-dusk.js';

@Component({
  selector: 'obi-palette-dusk',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiPaletteDusk {
  private _el: ObiPaletteDuskElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiPaletteDuskElement>,
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

