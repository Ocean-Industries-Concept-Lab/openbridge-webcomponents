import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiResize_center as ObiResize_centerElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-resize_center.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-resize_center.js';

@Component({
  selector: 'obi-resize_center',
  template: '<ng-content></ng-content>',
})
export class ObiResize_center {
  private _el: ObiResize_centerElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiResize_centerElement>,
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

