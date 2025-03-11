import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiPaletteDayBright as ObiPaletteDayBrightElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-palette-day-bright.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-palette-day-bright.js';

@Component({
  selector: 'obi-palette-day-bright',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiPaletteDayBright {
  private _el: ObiPaletteDayBrightElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiPaletteDayBrightElement>,
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

