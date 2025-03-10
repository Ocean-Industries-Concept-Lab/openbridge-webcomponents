import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCloudyColour as ObiCloudyColourElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cloudy-colour.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cloudy-colour.js';

@Component({
  selector: 'obi-cloudy-colour',
  template: '<ng-content></ng-content>',
})
export class ObiCloudyColour {
  private _el: ObiCloudyColourElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCloudyColourElement>,
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

