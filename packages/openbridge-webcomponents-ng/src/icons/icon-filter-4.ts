import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiFilter4 as ObiFilter4Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-filter-4.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-filter-4.js';

@Component({
  selector: 'obi-filter-4',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiFilter4 {
  private _el: ObiFilter4Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiFilter4Element>,
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

