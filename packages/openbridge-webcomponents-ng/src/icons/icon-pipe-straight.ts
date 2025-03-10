import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiPipeStraight as ObiPipeStraightElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-pipe-straight.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-pipe-straight.js';

@Component({
  selector: 'obi-pipe-straight',
  template: '<ng-content></ng-content>',
})
export class ObiPipeStraight {
  private _el: ObiPipeStraightElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiPipeStraightElement>,
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

