import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiResizeTop as ObiResizeTopElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-resize-top.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-resize-top.js';

@Component({
  selector: 'obi-resize-top',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiResizeTop {
  private _el: ObiResizeTopElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiResizeTopElement>,
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

