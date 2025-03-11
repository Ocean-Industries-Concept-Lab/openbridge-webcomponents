import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiPipeGoingTo as ObiPipeGoingToElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-pipe-going-to.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-pipe-going-to.js';

@Component({
  selector: 'obi-pipe-going-to',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiPipeGoingTo {
  private _el: ObiPipeGoingToElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiPipeGoingToElement>,
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

