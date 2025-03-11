import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTargetCamera as ObiTargetCameraElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-target-camera.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-target-camera.js';

@Component({
  selector: 'obi-target-camera',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiTargetCamera {
  private _el: ObiTargetCameraElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTargetCameraElement>,
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

