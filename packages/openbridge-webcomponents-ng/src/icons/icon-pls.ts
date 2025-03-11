import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiPls as ObiPlsElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-pls.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-pls.js';

@Component({
  selector: 'obi-pls',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiPls {
  private _el: ObiPlsElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiPlsElement>,
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

