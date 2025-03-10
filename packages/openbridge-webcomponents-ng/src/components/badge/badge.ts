import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';
import {BadgeSize, BadgeType} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/badge/badge.js';
export type {BadgeSize, BadgeType} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/badge/badge.js';
import type {ObcBadge as ObcBadgeElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/badge/badge.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/badge/badge.js';

@Component({
  selector: 'obc-badge',
  template: '<ng-content></ng-content>',
})
export class ObcBadge {
  private _el: ObcBadgeElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcBadgeElement>,
    ngZone: NgZone
  ) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
    
  }

  
  @Input()
  set number(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.number = v));
  }

  get number() {
    return this._el.number;
  }
  
  @Input()
  set hideNumber(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.hideNumber = v));
  }

  get hideNumber() {
    return this._el.hideNumber;
  }
  
  @Input()
  set size(v: BadgeSize) {
    this._ngZone.runOutsideAngular(() => (this._el.size = v));
  }

  get size() {
    return this._el.size;
  }
  
  @Input()
  set type(v: BadgeType) {
    this._ngZone.runOutsideAngular(() => (this._el.type = v));
  }

  get type() {
    return this._el.type;
  }
  

  
}

