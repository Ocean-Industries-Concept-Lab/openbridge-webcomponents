import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiPlaceholder as ObiPlaceholderElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-placeholder.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-placeholder.js';

@Component({
  selector: 'obi-placeholder',
  template: '<ng-content></ng-content>',
})
export class ObiPlaceholder {
  private _el: ObiPlaceholderElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiPlaceholderElement>,
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

