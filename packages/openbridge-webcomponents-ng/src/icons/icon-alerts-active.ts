import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAlertsActive as ObiAlertsActiveElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-alerts-active.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-alerts-active.js';

@Component({
  selector: 'obi-alerts-active',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiAlertsActive {
  private _el: ObiAlertsActiveElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAlertsActiveElement>,
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

