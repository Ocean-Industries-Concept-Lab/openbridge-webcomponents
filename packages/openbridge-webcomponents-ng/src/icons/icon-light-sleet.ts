import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightSleet as ObiLightSleetElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-sleet.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-sleet.js';

@Component({
  selector: 'obi-light-sleet',
  template: '<ng-content></ng-content>',
})
export class ObiLightSleet {
  private _el: ObiLightSleetElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightSleetElement>,
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

