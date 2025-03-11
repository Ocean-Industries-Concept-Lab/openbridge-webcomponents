import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiPipeComingFrom as ObiPipeComingFromElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-pipe-coming-from.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-pipe-coming-from.js';

@Component({
  selector: 'obi-pipe-coming-from',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiPipeComingFrom {
  private _el: ObiPipeComingFromElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiPipeComingFromElement>,
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

