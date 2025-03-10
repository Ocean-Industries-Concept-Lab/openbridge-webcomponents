import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiStar as ObiStarElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-star.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-star.js';

@Component({
  selector: 'obi-star',
  template: '<ng-content></ng-content>',
})
export class ObiStar {
  private _el: ObiStarElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiStarElement>,
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

