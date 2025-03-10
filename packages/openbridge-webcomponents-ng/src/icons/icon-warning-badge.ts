import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiWarningBadge as ObiWarningBadgeElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-warning-badge.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-warning-badge.js';

@Component({
  selector: 'obi-warning-badge',
  template: '<ng-content></ng-content>',
})
export class ObiWarningBadge {
  private _el: ObiWarningBadgeElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiWarningBadgeElement>,
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

