import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSlightlycloudyNight as ObiSlightlycloudyNightElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-slightlycloudy-night.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-slightlycloudy-night.js';

@Component({
  selector: 'obi-slightlycloudy-night',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiSlightlycloudyNight {
  private _el: ObiSlightlycloudyNightElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSlightlycloudyNightElement>,
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

