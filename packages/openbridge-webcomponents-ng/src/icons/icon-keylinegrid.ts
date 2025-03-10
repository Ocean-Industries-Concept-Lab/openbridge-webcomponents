import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiKeylinegrid as ObiKeylinegridElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-keylinegrid.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-keylinegrid.js';

@Component({
  selector: 'obi-keylinegrid',
  template: '<ng-content></ng-content>',
})
export class ObiKeylinegrid {
  private _el: ObiKeylinegridElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiKeylinegridElement>,
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

