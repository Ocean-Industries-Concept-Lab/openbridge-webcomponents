import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTargetAssociatedRadarCamera as ObiTargetAssociatedRadarCameraElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-target-associated-radar-camera.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-target-associated-radar-camera.js';

@Component({
  selector: 'obi-target-associated-radar-camera',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiTargetAssociatedRadarCamera {
  private _el: ObiTargetAssociatedRadarCameraElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTargetAssociatedRadarCameraElement>,
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

