import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiStw as ObiStwElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-stw.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-stw.js';

@Component({
  selector: 'obi-stw',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiStw {
  private _el: ObiStwElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiStwElement>,
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

