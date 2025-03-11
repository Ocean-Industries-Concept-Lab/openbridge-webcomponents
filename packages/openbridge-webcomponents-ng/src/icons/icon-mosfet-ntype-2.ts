import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiMosfetNtype2 as ObiMosfetNtype2Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-mosfet-ntype-2.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-mosfet-ntype-2.js';

@Component({
  selector: 'obi-mosfet-ntype-2',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiMosfetNtype2 {
  private _el: ObiMosfetNtype2Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiMosfetNtype2Element>,
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

