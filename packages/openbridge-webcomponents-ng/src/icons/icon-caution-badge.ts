import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCautionBadge as ObiCautionBadgeElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-caution-badge.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-caution-badge.js';

@Component({
  selector: 'obi-caution-badge',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiCautionBadge {
  private _el: ObiCautionBadgeElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCautionBadgeElement>,
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

