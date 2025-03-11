import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiWaypointEditIec as ObiWaypointEditIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-waypoint-edit-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-waypoint-edit-iec.js';

@Component({
  selector: 'obi-waypoint-edit-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiWaypointEditIec {
  private _el: ObiWaypointEditIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiWaypointEditIecElement>,
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

