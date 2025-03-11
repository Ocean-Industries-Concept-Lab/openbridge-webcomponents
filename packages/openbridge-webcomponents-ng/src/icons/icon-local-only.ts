import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLocalOnly as ObiLocalOnlyElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-local-only.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-local-only.js';

@Component({
  selector: 'obi-local-only',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLocalOnly {
  private _el: ObiLocalOnlyElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLocalOnlyElement>,
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

