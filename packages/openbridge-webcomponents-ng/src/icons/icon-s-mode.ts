import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSMode as ObiSModeElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-s-mode.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-s-mode.js';

@Component({
  selector: 'obi-s-mode',
  template: '<ng-content></ng-content>',
})
export class ObiSMode {
  private _el: ObiSModeElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSModeElement>,
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

