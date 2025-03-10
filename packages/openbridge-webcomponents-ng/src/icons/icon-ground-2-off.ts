import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiGround2Off as ObiGround2OffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ground-2-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ground-2-off.js';

@Component({
  selector: 'obi-ground-2-off',
  template: '<ng-content></ng-content>',
})
export class ObiGround2Off {
  private _el: ObiGround2OffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiGround2OffElement>,
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

