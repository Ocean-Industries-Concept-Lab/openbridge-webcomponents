import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiObjectDerelict as ObiObjectDerelictElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-object-derelict.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-object-derelict.js';

@Component({
  selector: 'obi-object-derelict',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiObjectDerelict {
  private _el: ObiObjectDerelictElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiObjectDerelictElement>,
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

