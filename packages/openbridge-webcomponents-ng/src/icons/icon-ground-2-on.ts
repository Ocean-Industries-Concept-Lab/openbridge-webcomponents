import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiGround2On as ObiGround2OnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ground-2-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ground-2-on.js';

@Component({
  selector: 'obi-ground-2-on',
  template: '<ng-content></ng-content>',
})
export class ObiGround2On {
  private _el: ObiGround2OnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiGround2OnElement>,
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

