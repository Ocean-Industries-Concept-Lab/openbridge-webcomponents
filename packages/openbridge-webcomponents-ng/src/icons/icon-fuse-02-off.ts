import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiFuse02Off as ObiFuse02OffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-fuse-02-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-fuse-02-off.js';

@Component({
  selector: 'obi-fuse-02-off',
  template: '<ng-content></ng-content>',
})
export class ObiFuse02Off {
  private _el: ObiFuse02OffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiFuse02OffElement>,
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

