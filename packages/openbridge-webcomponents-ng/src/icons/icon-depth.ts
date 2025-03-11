import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiDepth as ObiDepthElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-depth.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-depth.js';

@Component({
  selector: 'obi-depth',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiDepth {
  private _el: ObiDepthElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiDepthElement>,
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

