import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightSnow as ObiLightSnowElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-snow.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-snow.js';

@Component({
  selector: 'obi-light-snow',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLightSnow {
  private _el: ObiLightSnowElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightSnowElement>,
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

