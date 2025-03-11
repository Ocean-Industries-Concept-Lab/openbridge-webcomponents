import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiThreewayStackedInleftLeft50 as ObiThreewayStackedInleftLeft50Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-stacked-inleft-left-50.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-stacked-inleft-left-50.js';

@Component({
  selector: 'obi-threeway-stacked-inleft-left-50',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiThreewayStackedInleftLeft50 {
  private _el: ObiThreewayStackedInleftLeft50Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiThreewayStackedInleftLeft50Element>,
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

