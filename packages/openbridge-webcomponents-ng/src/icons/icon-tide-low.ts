import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTideLow as ObiTideLowElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-tide-low.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-tide-low.js';

@Component({
  selector: 'obi-tide-low',
  template: '<ng-content></ng-content>',
})
export class ObiTideLow {
  private _el: ObiTideLowElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTideLowElement>,
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

