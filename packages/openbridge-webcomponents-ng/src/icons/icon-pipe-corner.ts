import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiPipeCorner as ObiPipeCornerElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-pipe-corner.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-pipe-corner.js';

@Component({
  selector: 'obi-pipe-corner',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiPipeCorner {
  private _el: ObiPipeCornerElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiPipeCornerElement>,
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

