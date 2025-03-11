import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAssociatedTargetRadarIec as ObiAssociatedTargetRadarIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-associated-target-radar-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-associated-target-radar-iec.js';

@Component({
  selector: 'obi-associated-target-radar-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiAssociatedTargetRadarIec {
  private _el: ObiAssociatedTargetRadarIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAssociatedTargetRadarIecElement>,
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

