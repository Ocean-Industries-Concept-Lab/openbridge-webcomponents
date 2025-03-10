import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSources01On as ObiSources01OnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sources-01-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sources-01-on.js';

@Component({
  selector: 'obi-sources-01-on',
  template: '<ng-content></ng-content>',
})
export class ObiSources01On {
  private _el: ObiSources01OnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSources01OnElement>,
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

