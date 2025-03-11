import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiClearPolartwilightColour as ObiClearPolartwilightColourElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-clear-polartwilight-colour.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-clear-polartwilight-colour.js';

@Component({
  selector: 'obi-clear-polartwilight-colour',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiClearPolartwilightColour {
  private _el: ObiClearPolartwilightColourElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiClearPolartwilightColourElement>,
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

