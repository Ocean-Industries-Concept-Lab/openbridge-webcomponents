import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCctv as ObiCctvElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cctv.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cctv.js';

@Component({
  selector: 'obi-cctv',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiCctv {
  private _el: ObiCctvElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCctvElement>,
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

