import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiInput as ObiInputElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-input.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-input.js';

@Component({
  selector: 'obi-input',
  template: '<ng-content></ng-content>',
})
export class ObiInput {
  private _el: ObiInputElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiInputElement>,
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

