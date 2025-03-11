import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiDuctStraight as ObiDuctStraightElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-duct-straight.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-duct-straight.js';

@Component({
  selector: 'obi-duct-straight',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiDuctStraight {
  private _el: ObiDuctStraightElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiDuctStraightElement>,
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

