import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiInputDown as ObiInputDownElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-input-down.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-input-down.js';

@Component({
  selector: 'obi-input-down',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiInputDown {
  private _el: ObiInputDownElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiInputDownElement>,
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

