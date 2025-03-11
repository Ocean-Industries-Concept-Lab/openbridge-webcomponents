import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiFilter3 as ObiFilter3Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-filter-3.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-filter-3.js';

@Component({
  selector: 'obi-filter-3',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiFilter3 {
  private _el: ObiFilter3Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiFilter3Element>,
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

