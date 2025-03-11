import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiMove as ObiMoveElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-move.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-move.js';

@Component({
  selector: 'obi-move',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiMove {
  private _el: ObiMoveElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiMoveElement>,
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

