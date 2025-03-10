import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiComPaList as ObiComPaListElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-com-pa-list.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-com-pa-list.js';

@Component({
  selector: 'obi-com-pa-list',
  template: '<ng-content></ng-content>',
})
export class ObiComPaList {
  private _el: ObiComPaListElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiComPaListElement>,
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

