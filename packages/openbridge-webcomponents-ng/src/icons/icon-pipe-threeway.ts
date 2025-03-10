import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiPipeThreeway as ObiPipeThreewayElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-pipe-threeway.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-pipe-threeway.js';

@Component({
  selector: 'obi-pipe-threeway',
  template: '<ng-content></ng-content>',
})
export class ObiPipeThreeway {
  private _el: ObiPipeThreewayElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiPipeThreewayElement>,
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

