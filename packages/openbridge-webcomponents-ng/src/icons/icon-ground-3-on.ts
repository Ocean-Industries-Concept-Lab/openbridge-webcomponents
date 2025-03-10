import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiGround3On as ObiGround3OnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ground-3-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ground-3-on.js';

@Component({
  selector: 'obi-ground-3-on',
  template: '<ng-content></ng-content>',
})
export class ObiGround3On {
  private _el: ObiGround3OnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiGround3OnElement>,
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

