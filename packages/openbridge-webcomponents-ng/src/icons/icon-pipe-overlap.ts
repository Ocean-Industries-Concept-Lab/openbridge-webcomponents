import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiPipeOverlap as ObiPipeOverlapElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-pipe-overlap.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-pipe-overlap.js';

@Component({
  selector: 'obi-pipe-overlap',
  template: '<ng-content></ng-content>',
})
export class ObiPipeOverlap {
  private _el: ObiPipeOverlapElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiPipeOverlapElement>,
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

