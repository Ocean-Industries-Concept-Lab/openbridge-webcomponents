import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBackwardFast as ObiBackwardFastElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-backward-fast.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-backward-fast.js';

@Component({
  selector: 'obi-backward-fast',
  template: '<ng-content></ng-content>',
})
export class ObiBackwardFast {
  private _el: ObiBackwardFastElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBackwardFastElement>,
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

