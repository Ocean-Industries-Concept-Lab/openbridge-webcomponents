import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiExclamationMark as ObiExclamationMarkElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-exclamation-mark.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-exclamation-mark.js';

@Component({
  selector: 'obi-exclamation-mark',
  template: '<ng-content></ng-content>',
})
export class ObiExclamationMark {
  private _el: ObiExclamationMarkElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiExclamationMarkElement>,
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

