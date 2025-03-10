import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiClearNightColour as ObiClearNightColourElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-clear-night-colour.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-clear-night-colour.js';

@Component({
  selector: 'obi-clear-night-colour',
  template: '<ng-content></ng-content>',
})
export class ObiClearNightColour {
  private _el: ObiClearNightColourElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiClearNightColourElement>,
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

