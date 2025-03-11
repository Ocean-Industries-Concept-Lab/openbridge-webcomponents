import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTargetAssociatedAisCamera as ObiTargetAssociatedAisCameraElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-target-associated-ais-camera.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-target-associated-ais-camera.js';

@Component({
  selector: 'obi-target-associated-ais-camera',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiTargetAssociatedAisCamera {
  private _el: ObiTargetAssociatedAisCameraElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTargetAssociatedAisCameraElement>,
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

