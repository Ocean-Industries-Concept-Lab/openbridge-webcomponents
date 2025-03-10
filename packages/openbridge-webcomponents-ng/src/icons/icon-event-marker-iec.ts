import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiEventMarkerIec as ObiEventMarkerIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-event-marker-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-event-marker-iec.js';

@Component({
  selector: 'obi-event-marker-iec',
  template: '<ng-content></ng-content>',
})
export class ObiEventMarkerIec {
  private _el: ObiEventMarkerIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiEventMarkerIecElement>,
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

