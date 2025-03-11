import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiThreewayStackedInleftBottom75 as ObiThreewayStackedInleftBottom75Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-stacked-inleft-bottom-75.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-stacked-inleft-bottom-75.js';

@Component({
  selector: 'obi-threeway-stacked-inleft-bottom-75',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiThreewayStackedInleftBottom75 {
  private _el: ObiThreewayStackedInleftBottom75Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiThreewayStackedInleftBottom75Element>,
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

