import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiPipeEndPoint as ObiPipeEndPointElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-pipe-end-point.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-pipe-end-point.js';

@Component({
  selector: 'obi-pipe-end-point',
  template: '<ng-content></ng-content>',
})
export class ObiPipeEndPoint {
  private _el: ObiPipeEndPointElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiPipeEndPointElement>,
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

