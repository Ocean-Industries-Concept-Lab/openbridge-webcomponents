import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiDuty as ObiDutyElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-duty.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-duty.js';

@Component({
  selector: 'obi-duty',
  template: '<ng-content></ng-content>',
})
export class ObiDuty {
  private _el: ObiDutyElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiDutyElement>,
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

