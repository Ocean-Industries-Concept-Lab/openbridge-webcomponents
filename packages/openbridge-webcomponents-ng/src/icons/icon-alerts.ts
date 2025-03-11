import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAlerts as ObiAlertsElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-alerts.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-alerts.js';

@Component({
  selector: 'obi-alerts',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiAlerts {
  private _el: ObiAlertsElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAlertsElement>,
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

