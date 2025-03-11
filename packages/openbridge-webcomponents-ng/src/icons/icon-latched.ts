import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLatched as ObiLatchedElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-latched.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-latched.js';

@Component({
  selector: 'obi-latched',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLatched {
  private _el: ObiLatchedElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLatchedElement>,
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

