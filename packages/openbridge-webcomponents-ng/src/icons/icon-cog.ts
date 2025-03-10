import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCog as ObiCogElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cog.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cog.js';

@Component({
  selector: 'obi-cog',
  template: '<ng-content></ng-content>',
})
export class ObiCog {
  private _el: ObiCogElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCogElement>,
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

