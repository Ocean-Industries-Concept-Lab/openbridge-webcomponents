import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiGenericLineGoingTo as ObiGenericLineGoingToElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-generic-line-going-to.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-generic-line-going-to.js';

@Component({
  selector: 'obi-generic-line-going-to',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiGenericLineGoingTo {
  private _el: ObiGenericLineGoingToElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiGenericLineGoingToElement>,
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

