import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiGround1On as ObiGround1OnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ground-1-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ground-1-on.js';

@Component({
  selector: 'obi-ground-1-on',
  template: '<ng-content></ng-content>',
})
export class ObiGround1On {
  private _el: ObiGround1OnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiGround1OnElement>,
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

