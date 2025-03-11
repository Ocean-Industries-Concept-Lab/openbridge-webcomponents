import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCapacitor02 as ObiCapacitor02Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-capacitor-02.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-capacitor-02.js';

@Component({
  selector: 'obi-capacitor-02',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiCapacitor02 {
  private _el: ObiCapacitor02Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCapacitor02Element>,
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

