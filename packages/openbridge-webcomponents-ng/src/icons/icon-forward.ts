import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiForward as ObiForwardElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-forward.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-forward.js';

@Component({
  selector: 'obi-forward',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiForward {
  private _el: ObiForwardElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiForwardElement>,
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

