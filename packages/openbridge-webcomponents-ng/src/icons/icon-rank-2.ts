import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiRank2 as ObiRank2Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-rank-2.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-rank-2.js';

@Component({
  selector: 'obi-rank-2',
  template: '<ng-content></ng-content>',
})
export class ObiRank2 {
  private _el: ObiRank2Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiRank2Element>,
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

