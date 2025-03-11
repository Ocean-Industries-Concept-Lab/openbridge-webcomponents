import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSog as ObiSogElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sog.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sog.js';

@Component({
  selector: 'obi-sog',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiSog {
  private _el: ObiSogElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSogElement>,
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

