import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiWarningRectified as ObiWarningRectifiedElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-warning-rectified.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-warning-rectified.js';

@Component({
  selector: 'obi-warning-rectified',
  template: '<ng-content></ng-content>',
})
export class ObiWarningRectified {
  private _el: ObiWarningRectifiedElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiWarningRectifiedElement>,
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

