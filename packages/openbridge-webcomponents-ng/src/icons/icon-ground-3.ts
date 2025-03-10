import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiGround3 as ObiGround3Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ground-3.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ground-3.js';

@Component({
  selector: 'obi-ground-3',
  template: '<ng-content></ng-content>',
})
export class ObiGround3 {
  private _el: ObiGround3Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiGround3Element>,
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

