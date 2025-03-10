import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTargetPriorityRadarIec as ObiTargetPriorityRadarIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-target-priority-radar-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-target-priority-radar-iec.js';

@Component({
  selector: 'obi-target-priority-radar-iec',
  template: '<ng-content></ng-content>',
})
export class ObiTargetPriorityRadarIec {
  private _el: ObiTargetPriorityRadarIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTargetPriorityRadarIecElement>,
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

