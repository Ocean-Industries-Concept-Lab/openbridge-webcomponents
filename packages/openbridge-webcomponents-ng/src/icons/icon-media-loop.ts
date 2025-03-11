import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiMediaLoop as ObiMediaLoopElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-media-loop.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-media-loop.js';

@Component({
  selector: 'obi-media-loop',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiMediaLoop {
  private _el: ObiMediaLoopElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiMediaLoopElement>,
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

