import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAssociatedTargetRadarSelectedIec as ObiAssociatedTargetRadarSelectedIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-associated-target-radar-selected-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-associated-target-radar-selected-iec.js';

@Component({
  selector: 'obi-associated-target-radar-selected-iec',
  template: '<ng-content></ng-content>',
})
export class ObiAssociatedTargetRadarSelectedIec {
  private _el: ObiAssociatedTargetRadarSelectedIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAssociatedTargetRadarSelectedIecElement>,
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

