import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiFuse01On as ObiFuse01OnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-fuse-01-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-fuse-01-on.js';

@Component({
  selector: 'obi-fuse-01-on',
  template: '<ng-content></ng-content>',
})
export class ObiFuse01On {
  private _el: ObiFuse01OnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiFuse01OnElement>,
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

