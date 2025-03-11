import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiObjectLagan as ObiObjectLaganElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-object-lagan.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-object-lagan.js';

@Component({
  selector: 'obi-object-lagan',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiObjectLagan {
  private _el: ObiObjectLaganElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiObjectLaganElement>,
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

