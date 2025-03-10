import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiHelp as ObiHelpElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-help.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-help.js';

@Component({
  selector: 'obi-help',
  template: '<ng-content></ng-content>',
})
export class ObiHelp {
  private _el: ObiHelpElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiHelpElement>,
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

