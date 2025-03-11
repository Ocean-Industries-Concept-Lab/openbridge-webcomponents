import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiWaypointDeleteIec as ObiWaypointDeleteIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-waypoint-delete-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-waypoint-delete-iec.js';

@Component({
  selector: 'obi-waypoint-delete-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiWaypointDeleteIec {
  private _el: ObiWaypointDeleteIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiWaypointDeleteIecElement>,
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

