import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightsLeetColour as ObiLightsLeetColourElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lights-leet-colour.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lights-leet-colour.js';

@Component({
  selector: 'obi-lights-leet-colour',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLightsLeetColour {
  private _el: ObiLightsLeetColourElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightsLeetColourElement>,
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

