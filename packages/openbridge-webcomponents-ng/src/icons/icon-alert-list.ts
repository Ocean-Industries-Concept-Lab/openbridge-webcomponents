import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAlertList as ObiAlertListElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-alert-list.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-alert-list.js';

@Component({
  selector: 'obi-alert-list',
  template: '<ng-content></ng-content>',
})
export class ObiAlertList {
  private _el: ObiAlertListElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAlertListElement>,
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

