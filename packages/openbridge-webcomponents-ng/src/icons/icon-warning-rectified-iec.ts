import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiWarningRectifiedIec as ObiWarningRectifiedIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-warning-rectified-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-warning-rectified-iec.js';

@Component({
  selector: 'obi-warning-rectified-iec',
  template: '<ng-content></ng-content>',
})
export class ObiWarningRectifiedIec {
  private _el: ObiWarningRectifiedIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiWarningRectifiedIecElement>,
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

