import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiRank4 as ObiRank4Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-rank-4.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-rank-4.js';

@Component({
  selector: 'obi-rank-4',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiRank4 {
  private _el: ObiRank4Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiRank4Element>,
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

