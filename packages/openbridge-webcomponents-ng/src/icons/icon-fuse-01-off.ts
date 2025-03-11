import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiFuse01Off as ObiFuse01OffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-fuse-01-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-fuse-01-off.js';

@Component({
  selector: 'obi-fuse-01-off',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiFuse01Off {
  private _el: ObiFuse01OffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiFuse01OffElement>,
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

