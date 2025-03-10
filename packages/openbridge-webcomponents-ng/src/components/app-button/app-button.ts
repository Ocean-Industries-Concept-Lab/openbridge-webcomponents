import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';
import {AppButtonSize} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/app-button/app-button.js';
export type {AppButtonSize} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/app-button/app-button.js';
import type {ObcAppButton as ObcAppButtonElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/app-button/app-button.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/app-button/app-button.js';

@Component({
  selector: 'obc-app-button',
  template: '<ng-content></ng-content>',
})
export class ObcAppButton {
  private _el: ObcAppButtonElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcAppButtonElement>,
    ngZone: NgZone
  ) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
    
  }

  
  @Input()
  set label(v: string) {
    this._ngZone.runOutsideAngular(() => (this._el.label = v));
  }

  get label() {
    return this._el.label;
  }
  
  @Input()
  set checked(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.checked = v));
  }

  get checked() {
    return this._el.checked;
  }
  
  @Input()
  set size(v: AppButtonSize) {
    this._ngZone.runOutsideAngular(() => (this._el.size = v));
  }

  get size() {
    return this._el.size;
  }
  

  
}

