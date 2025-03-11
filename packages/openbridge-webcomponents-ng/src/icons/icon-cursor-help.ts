import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCursorHelp as ObiCursorHelpElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cursor-help.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cursor-help.js';

@Component({
  selector: 'obi-cursor-help',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiCursorHelp {
  private _el: ObiCursorHelpElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCursorHelpElement>,
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

