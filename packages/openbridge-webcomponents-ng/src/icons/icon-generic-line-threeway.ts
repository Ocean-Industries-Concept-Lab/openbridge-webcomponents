import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiGenericLineThreeway as ObiGenericLineThreewayElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-generic-line-threeway.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-generic-line-threeway.js';

@Component({
  selector: 'obi-generic-line-threeway',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiGenericLineThreeway {
  private _el: ObiGenericLineThreewayElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiGenericLineThreewayElement>,
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

