import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';
import {IconButtonVariant} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/icon-button/icon-button.js';
export type {IconButtonVariant} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/icon-button/icon-button.js';
import type {ObcIconButton as ObcIconButtonElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/icon-button/icon-button.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/icon-button/icon-button.js';

@Component({
  selector: 'obc-icon-button',
  template: '<ng-content></ng-content>',
})
export class ObcIconButton {
  private _el: ObcIconButtonElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcIconButtonElement>,
    ngZone: NgZone
  ) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
    
  }

  
  @Input()
  set variant(v: IconButtonVariant) {
    this._ngZone.runOutsideAngular(() => (this._el.variant = v));
  }

  get variant() {
    return this._el.variant;
  }
  
  @Input()
  set activated(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.activated = v));
  }

  get activated() {
    return this._el.activated;
  }
  
  @Input()
  set cornerLeft(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.cornerLeft = v));
  }

  get cornerLeft() {
    return this._el.cornerLeft;
  }
  
  @Input()
  set cornerRight(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.cornerRight = v));
  }

  get cornerRight() {
    return this._el.cornerRight;
  }
  
  @Input()
  set activeColor(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.activeColor = v));
  }

  get activeColor() {
    return this._el.activeColor;
  }
  
  @Input()
  set wide(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.wide = v));
  }

  get wide() {
    return this._el.wide;
  }
  
  @Input()
  set disabled(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.disabled = v));
  }

  get disabled() {
    return this._el.disabled;
  }
  

  
}

