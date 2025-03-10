import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiScreenSplitTop as ObiScreenSplitTopElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-screen-split-top.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-screen-split-top.js';

@Component({
  selector: 'obi-screen-split-top',
  template: '<ng-content></ng-content>',
})
export class ObiScreenSplitTop {
  private _el: ObiScreenSplitTopElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiScreenSplitTopElement>,
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

