import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiScreens as ObiScreensElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-screens.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-screens.js';

@Component({
  selector: 'obi-screens',
  template: '<ng-content></ng-content>',
})
export class ObiScreens {
  private _el: ObiScreensElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiScreensElement>,
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

