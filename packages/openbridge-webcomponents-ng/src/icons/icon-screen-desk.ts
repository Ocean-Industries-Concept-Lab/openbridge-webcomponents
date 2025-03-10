import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiScreenDesk as ObiScreenDeskElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-screen-desk.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-screen-desk.js';

@Component({
  selector: 'obi-screen-desk',
  template: '<ng-content></ng-content>',
})
export class ObiScreenDesk {
  private _el: ObiScreenDeskElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiScreenDeskElement>,
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

