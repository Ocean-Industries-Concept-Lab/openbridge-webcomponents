import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiRank6 as ObiRank6Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-rank-6.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-rank-6.js';

@Component({
  selector: 'obi-rank-6',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiRank6 {
  private _el: ObiRank6Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiRank6Element>,
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

