import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightFloat as ObiLightFloatElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-float.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-float.js';

@Component({
  selector: 'obi-light-float',
  template: '<ng-content></ng-content>',
})
export class ObiLightFloat {
  private _el: ObiLightFloatElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightFloatElement>,
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

