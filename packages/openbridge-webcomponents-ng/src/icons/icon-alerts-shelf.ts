import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAlertsShelf as ObiAlertsShelfElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-alerts-shelf.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-alerts-shelf.js';

@Component({
  selector: 'obi-alerts-shelf',
  template: '<ng-content></ng-content>',
})
export class ObiAlertsShelf {
  private _el: ObiAlertsShelfElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAlertsShelfElement>,
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

