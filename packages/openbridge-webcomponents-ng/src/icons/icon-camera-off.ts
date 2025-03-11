import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCameraOff as ObiCameraOffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-camera-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-camera-off.js';

@Component({
  selector: 'obi-camera-off',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiCameraOff {
  private _el: ObiCameraOffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCameraOffElement>,
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

