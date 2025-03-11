import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLineOfPosition as ObiLineOfPositionElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-line-of-position.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-line-of-position.js';

@Component({
  selector: 'obi-line-of-position',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLineOfPosition {
  private _el: ObiLineOfPositionElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLineOfPositionElement>,
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

