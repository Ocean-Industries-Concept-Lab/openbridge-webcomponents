import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightRoofOff as ObiLightRoofOffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-roof-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-roof-off.js';

@Component({
  selector: 'obi-light-roof-off',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLightRoofOff {
  private _el: ObiLightRoofOffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightRoofOffElement>,
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

