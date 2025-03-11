import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiPaletteDayNightIec as ObiPaletteDayNightIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-palette-day-night-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-palette-day-night-iec.js';

@Component({
  selector: 'obi-palette-day-night-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiPaletteDayNightIec {
  private _el: ObiPaletteDayNightIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiPaletteDayNightIecElement>,
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

