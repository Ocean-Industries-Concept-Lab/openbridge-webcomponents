import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiRank5 as ObiRank5Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-rank-5.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-rank-5.js';

@Component({
  selector: 'obi-rank-5',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiRank5 {
  private _el: ObiRank5Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiRank5Element>,
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

