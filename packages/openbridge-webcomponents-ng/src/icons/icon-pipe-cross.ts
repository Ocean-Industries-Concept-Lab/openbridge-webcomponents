import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiPipeCross as ObiPipeCrossElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-pipe-cross.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-pipe-cross.js';

@Component({
  selector: 'obi-pipe-cross',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiPipeCross {
  private _el: ObiPipeCrossElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiPipeCrossElement>,
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

