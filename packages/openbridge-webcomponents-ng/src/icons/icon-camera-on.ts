import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCameraOn as ObiCameraOnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-camera-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-camera-on.js';

@Component({
  selector: 'obi-camera-on',
  template: '<ng-content></ng-content>',
})
export class ObiCameraOn {
  private _el: ObiCameraOnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCameraOnElement>,
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

