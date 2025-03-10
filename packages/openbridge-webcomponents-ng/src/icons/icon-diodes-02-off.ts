import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiDiodes02Off as ObiDiodes02OffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-diodes-02-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-diodes-02-off.js';

@Component({
  selector: 'obi-diodes-02-off',
  template: '<ng-content></ng-content>',
})
export class ObiDiodes02Off {
  private _el: ObiDiodes02OffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiDiodes02OffElement>,
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

