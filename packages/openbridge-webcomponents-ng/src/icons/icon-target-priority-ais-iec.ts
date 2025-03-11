import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTargetPriorityAisIec as ObiTargetPriorityAisIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-target-priority-ais-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-target-priority-ais-iec.js';

@Component({
  selector: 'obi-target-priority-ais-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiTargetPriorityAisIec {
  private _el: ObiTargetPriorityAisIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTargetPriorityAisIecElement>,
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

