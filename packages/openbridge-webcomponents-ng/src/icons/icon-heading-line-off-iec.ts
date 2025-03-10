import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiHeadingLineOffIec as ObiHeadingLineOffIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heading-line-off-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heading-line-off-iec.js';

@Component({
  selector: 'obi-heading-line-off-iec',
  template: '<ng-content></ng-content>',
})
export class ObiHeadingLineOffIec {
  private _el: ObiHeadingLineOffIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiHeadingLineOffIecElement>,
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

