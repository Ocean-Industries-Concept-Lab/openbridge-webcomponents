import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAnchorwatch as ObiAnchorwatchElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-anchorwatch.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-anchorwatch.js';

@Component({
  selector: 'obi-anchorwatch',
  template: '<ng-content></ng-content>',
})
export class ObiAnchorwatch {
  private _el: ObiAnchorwatchElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAnchorwatchElement>,
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

