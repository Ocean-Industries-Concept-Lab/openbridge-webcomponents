import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiScreenSplitLeft as ObiScreenSplitLeftElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-screen-split-left.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-screen-split-left.js';

@Component({
  selector: 'obi-screen-split-left',
  template: '<ng-content></ng-content>',
})
export class ObiScreenSplitLeft {
  private _el: ObiScreenSplitLeftElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiScreenSplitLeftElement>,
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

