import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightAolOff as ObiLightAolOffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-aol-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-aol-off.js';

@Component({
  selector: 'obi-light-aol-off',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLightAolOff {
  private _el: ObiLightAolOffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightAolOffElement>,
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

