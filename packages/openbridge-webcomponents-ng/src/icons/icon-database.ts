import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiDatabase as ObiDatabaseElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-database.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-database.js';

@Component({
  selector: 'obi-database',
  template: '<ng-content></ng-content>',
})
export class ObiDatabase {
  private _el: ObiDatabaseElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiDatabaseElement>,
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

