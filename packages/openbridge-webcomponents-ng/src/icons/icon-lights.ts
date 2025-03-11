import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLights as ObiLightsElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lights.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lights.js';

@Component({
  selector: 'obi-lights',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLights {
  private _el: ObiLightsElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightsElement>,
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

