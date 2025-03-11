import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiGenericLineOverlap as ObiGenericLineOverlapElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-generic-line-overlap.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-generic-line-overlap.js';

@Component({
  selector: 'obi-generic-line-overlap',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiGenericLineOverlap {
  private _el: ObiGenericLineOverlapElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiGenericLineOverlapElement>,
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

