import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiUnderwaysailing as ObiUnderwaysailingElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-underwaysailing.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-underwaysailing.js';

@Component({
  selector: 'obi-underwaysailing',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiUnderwaysailing {
  private _el: ObiUnderwaysailingElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiUnderwaysailingElement>,
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

