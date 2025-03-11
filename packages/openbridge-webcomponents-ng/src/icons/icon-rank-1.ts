import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiRank1 as ObiRank1Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-rank-1.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-rank-1.js';

@Component({
  selector: 'obi-rank-1',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiRank1 {
  private _el: ObiRank1Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiRank1Element>,
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

