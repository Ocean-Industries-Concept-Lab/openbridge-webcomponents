import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiInputKeyboardScreenGoogle as ObiInputKeyboardScreenGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-input-keyboard-screen-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-input-keyboard-screen-google.js';

@Component({
  selector: 'obi-input-keyboard-screen-google',
  template: '<ng-content></ng-content>',
})
export class ObiInputKeyboardScreenGoogle {
  private _el: ObiInputKeyboardScreenGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiInputKeyboardScreenGoogleElement>,
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

