import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiScreenSplitRight as ObiScreenSplitRightElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-screen-split-right.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-screen-split-right.js';

@Component({
  selector: 'obi-screen-split-right',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiScreenSplitRight {
  private _el: ObiScreenSplitRightElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiScreenSplitRightElement>,
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

