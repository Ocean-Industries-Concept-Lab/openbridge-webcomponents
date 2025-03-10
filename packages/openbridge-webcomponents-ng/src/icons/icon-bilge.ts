import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBilge as ObiBilgeElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-bilge.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-bilge.js';

@Component({
  selector: 'obi-bilge',
  template: '<ng-content></ng-content>',
})
export class ObiBilge {
  private _el: ObiBilgeElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBilgeElement>,
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

