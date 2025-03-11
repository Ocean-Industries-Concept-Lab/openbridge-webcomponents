import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightLanternOff as ObiLightLanternOffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-lantern-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-lantern-off.js';

@Component({
  selector: 'obi-light-lantern-off',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLightLanternOff {
  private _el: ObiLightLanternOffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightLanternOffElement>,
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

