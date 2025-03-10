import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {Obi03TidalStream as Obi03TidalStreamElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-03-tidal-stream.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-03-tidal-stream.js';

@Component({
  selector: 'obi-03-tidal-stream',
  template: '<ng-content></ng-content>',
})
export class Obi03TidalStream {
  private _el: Obi03TidalStreamElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<Obi03TidalStreamElement>,
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

