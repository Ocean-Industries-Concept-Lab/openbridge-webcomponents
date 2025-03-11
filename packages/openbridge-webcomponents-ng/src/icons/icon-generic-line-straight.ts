import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiGenericLineStraight as ObiGenericLineStraightElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-generic-line-straight.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-generic-line-straight.js';

@Component({
  selector: 'obi-generic-line-straight',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiGenericLineStraight {
  private _el: ObiGenericLineStraightElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiGenericLineStraightElement>,
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

