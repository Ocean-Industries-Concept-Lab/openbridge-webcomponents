import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCursorSetpointIcon as ObiCursorSetpointIconElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cursor-setpoint-icon.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cursor-setpoint-icon.js';

@Component({
  selector: 'obi-cursor-setpoint-icon',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiCursorSetpointIcon {
  private _el: ObiCursorSetpointIconElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCursorSetpointIconElement>,
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

