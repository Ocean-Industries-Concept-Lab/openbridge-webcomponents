import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiRotate as ObiRotateElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-rotate.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-rotate.js';

@Component({
  selector: 'obi-rotate',
  template: '<ng-content></ng-content>',
})
export class ObiRotate {
  private _el: ObiRotateElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiRotateElement>,
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

