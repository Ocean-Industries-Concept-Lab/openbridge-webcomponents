import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';
import {ButtonVariant} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/button/button.js';
export type {ButtonVariant} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/button/button.js';
import type {ObcButton as ObcButtonElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/button/button.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/button/button.js';

@Component({
  selector: 'obc-button',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObcButton {
  private _el: ObcButtonElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcButtonElement>,
    ngZone: NgZone
  ) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
    
  }

  
  @Input()
  set icon(v: string) {
    this._ngZone.runOutsideAngular(() => (this._el.icon = v));
  }

  get icon() {
    return this._el.icon;
  }
  
  @Input()
  set variant(v: ButtonVariant) {
    this._ngZone.runOutsideAngular(() => (this._el.variant = v));
  }

  get variant() {
    return this._el.variant;
  }
  
  @Input()
  set fullWidth(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.fullWidth = v));
  }

  get fullWidth() {
    return this._el.fullWidth;
  }
  
  @Input()
  set checked(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.checked = v));
  }

  get checked() {
    return this._el.checked;
  }
  
  @Input()
  set disabled(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.disabled = v));
  }

  get disabled() {
    return this._el.disabled;
  }
  
  @Input()
  set href(v: string | undefined) {
    this._ngZone.runOutsideAngular(() => (this._el.href = v));
  }

  get href() {
    return this._el.href;
  }
  
  @Input()
  set target(v: string | undefined) {
    this._ngZone.runOutsideAngular(() => (this._el.target = v));
  }

  get target() {
    return this._el.target;
  }
  

  
}

