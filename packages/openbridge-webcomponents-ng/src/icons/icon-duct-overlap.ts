import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiDuctOverlap as ObiDuctOverlapElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-duct-overlap.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-duct-overlap.js';

@Component({
  selector: 'obi-duct-overlap',
  template: '<ng-content></ng-content>',
})
export class ObiDuctOverlap {
  private _el: ObiDuctOverlapElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiDuctOverlapElement>,
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

