import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSurfing as ObiSurfingElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-surfing.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-surfing.js';

@Component({
  selector: 'obi-surfing',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiSurfing {
  private _el: ObiSurfingElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSurfingElement>,
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

