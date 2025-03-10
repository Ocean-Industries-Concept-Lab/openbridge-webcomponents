import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCursorHelpIcon as ObiCursorHelpIconElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cursor-help-icon.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cursor-help-icon.js';

@Component({
  selector: 'obi-cursor-help-icon',
  template: '<ng-content></ng-content>',
})
export class ObiCursorHelpIcon {
  private _el: ObiCursorHelpIconElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCursorHelpIconElement>,
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

