import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiInputKeyboardGoogle as ObiInputKeyboardGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-input-keyboard-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-input-keyboard-google.js';

@Component({
  selector: 'obi-input-keyboard-google',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiInputKeyboardGoogle {
  private _el: ObiInputKeyboardGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiInputKeyboardGoogleElement>,
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

