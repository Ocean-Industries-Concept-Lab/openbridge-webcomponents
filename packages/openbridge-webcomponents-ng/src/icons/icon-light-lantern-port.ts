import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightLanternPort as ObiLightLanternPortElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-lantern-port.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-lantern-port.js';

@Component({
  selector: 'obi-light-lantern-port',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLightLanternPort {
  private _el: ObiLightLanternPortElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightLanternPortElement>,
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

