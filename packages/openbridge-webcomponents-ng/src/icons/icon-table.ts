import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTable as ObiTableElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-table.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-table.js';

@Component({
  selector: 'obi-table',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiTable {
  private _el: ObiTableElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTableElement>,
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

