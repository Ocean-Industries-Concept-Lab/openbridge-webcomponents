import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTargetAssociatedCameraRadar as ObiTargetAssociatedCameraRadarElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-target-associated-camera-radar.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-target-associated-camera-radar.js';

@Component({
  selector: 'obi-target-associated-camera-radar',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiTargetAssociatedCameraRadar {
  private _el: ObiTargetAssociatedCameraRadarElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTargetAssociatedCameraRadarElement>,
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

