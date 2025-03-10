import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSwitch03On as ObiSwitch03OnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-switch-03-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-switch-03-on.js';

@Component({
  selector: 'obi-switch-03-on',
  template: '<ng-content></ng-content>',
})
export class ObiSwitch03On {
  private _el: ObiSwitch03OnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSwitch03OnElement>,
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

