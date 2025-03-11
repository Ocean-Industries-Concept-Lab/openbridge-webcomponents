import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiRainColour as ObiRainColourElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-rain-colour.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-rain-colour.js';

@Component({
  selector: 'obi-rain-colour',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiRainColour {
  private _el: ObiRainColourElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiRainColourElement>,
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

