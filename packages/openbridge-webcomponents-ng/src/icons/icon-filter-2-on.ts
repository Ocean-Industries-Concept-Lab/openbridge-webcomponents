import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiFilter2On as ObiFilter2OnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-filter-2-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-filter-2-on.js';

@Component({
  selector: 'obi-filter-2-on',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiFilter2On {
  private _el: ObiFilter2OnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiFilter2OnElement>,
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

