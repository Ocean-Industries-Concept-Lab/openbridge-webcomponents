import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiRank3 as ObiRank3Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-rank-3.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-rank-3.js';

@Component({
  selector: 'obi-rank-3',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiRank3 {
  private _el: ObiRank3Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiRank3Element>,
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

