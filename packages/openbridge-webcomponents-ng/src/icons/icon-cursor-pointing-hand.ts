import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCursorPointingHand as ObiCursorPointingHandElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cursor-pointing-hand.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cursor-pointing-hand.js';

@Component({
  selector: 'obi-cursor-pointing-hand',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiCursorPointingHand {
  private _el: ObiCursorPointingHandElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCursorPointingHandElement>,
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

