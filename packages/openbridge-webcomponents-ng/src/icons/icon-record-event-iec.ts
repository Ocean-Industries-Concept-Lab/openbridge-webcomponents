import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiRecordEventIec as ObiRecordEventIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-record-event-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-record-event-iec.js';

@Component({
  selector: 'obi-record-event-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiRecordEventIec {
  private _el: ObiRecordEventIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiRecordEventIecElement>,
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

