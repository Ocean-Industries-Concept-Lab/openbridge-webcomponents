import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCameraTilt as ObiCameraTiltElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-camera-tilt.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-camera-tilt.js';

@Component({
  selector: 'obi-camera-tilt',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiCameraTilt {
  private _el: ObiCameraTiltElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCameraTiltElement>,
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

