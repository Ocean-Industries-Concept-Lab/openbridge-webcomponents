import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiFuse02On as ObiFuse02OnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-fuse-02-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-fuse-02-on.js';

@Component({
  selector: 'obi-fuse-02-on',
  template: '<ng-content></ng-content>',
})
export class ObiFuse02On {
  private _el: ObiFuse02OnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiFuse02OnElement>,
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

