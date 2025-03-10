import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightSnowColour as ObiLightSnowColourElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-snow-colour.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-snow-colour.js';

@Component({
  selector: 'obi-light-snow-colour',
  template: '<ng-content></ng-content>',
})
export class ObiLightSnowColour {
  private _el: ObiLightSnowColourElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightSnowColourElement>,
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

