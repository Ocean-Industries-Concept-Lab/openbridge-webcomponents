import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiInfo as ObiInfoElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-info.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-info.js';

@Component({
  selector: 'obi-info',
  template: '<ng-content></ng-content>',
})
export class ObiInfo {
  private _el: ObiInfoElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiInfoElement>,
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

