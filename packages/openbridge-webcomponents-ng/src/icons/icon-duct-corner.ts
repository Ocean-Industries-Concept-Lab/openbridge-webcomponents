import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiDuctCorner as ObiDuctCornerElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-duct-corner.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-duct-corner.js';

@Component({
  selector: 'obi-duct-corner',
  template: '<ng-content></ng-content>',
})
export class ObiDuctCorner {
  private _el: ObiDuctCornerElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiDuctCornerElement>,
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

