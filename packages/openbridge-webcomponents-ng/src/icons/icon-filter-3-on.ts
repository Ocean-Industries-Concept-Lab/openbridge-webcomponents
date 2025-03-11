import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiFilter3On as ObiFilter3OnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-filter-3-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-filter-3-on.js';

@Component({
  selector: 'obi-filter-3-on',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiFilter3On {
  private _el: ObiFilter3OnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiFilter3OnElement>,
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

