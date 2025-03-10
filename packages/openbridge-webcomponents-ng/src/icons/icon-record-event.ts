import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiRecordEvent as ObiRecordEventElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-record-event.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-record-event.js';

@Component({
  selector: 'obi-record-event',
  template: '<ng-content></ng-content>',
})
export class ObiRecordEvent {
  private _el: ObiRecordEventElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiRecordEventElement>,
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

