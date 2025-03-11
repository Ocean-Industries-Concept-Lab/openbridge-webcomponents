import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAlertRectified as ObiAlertRectifiedElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-alert-rectified.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-alert-rectified.js';

@Component({
  selector: 'obi-alert-rectified',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiAlertRectified {
  private _el: ObiAlertRectifiedElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAlertRectifiedElement>,
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

