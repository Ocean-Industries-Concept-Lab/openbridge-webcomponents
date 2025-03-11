import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiHeavyRainColour as ObiHeavyRainColourElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heavy-rain-colour.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heavy-rain-colour.js';

@Component({
  selector: 'obi-heavy-rain-colour',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiHeavyRainColour {
  private _el: ObiHeavyRainColourElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiHeavyRainColourElement>,
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

