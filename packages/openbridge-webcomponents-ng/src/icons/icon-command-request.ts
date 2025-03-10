import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCommandRequest as ObiCommandRequestElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-command-request.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-command-request.js';

@Component({
  selector: 'obi-command-request',
  template: '<ng-content></ng-content>',
})
export class ObiCommandRequest {
  private _el: ObiCommandRequestElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCommandRequestElement>,
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

