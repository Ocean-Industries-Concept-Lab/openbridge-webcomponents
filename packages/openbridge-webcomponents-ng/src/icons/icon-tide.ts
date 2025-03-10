import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTide as ObiTideElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-tide.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-tide.js';

@Component({
  selector: 'obi-tide',
  template: '<ng-content></ng-content>',
})
export class ObiTide {
  private _el: ObiTideElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTideElement>,
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

