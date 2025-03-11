import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiDuctCross as ObiDuctCrossElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-duct-cross.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-duct-cross.js';

@Component({
  selector: 'obi-duct-cross',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiDuctCross {
  private _el: ObiDuctCrossElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiDuctCrossElement>,
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

